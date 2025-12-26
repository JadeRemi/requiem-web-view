import { useState, Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, useGLTF, Center } from '@react-three/drei'
import { Typography, TypographyVariant } from '../components/Typography'
import { ItemTooltip } from '../components/ItemTooltip'
import { usePageTitle } from '../hooks/usePageTitle'
import { RECIPES, Recipe, RecipeIngredient } from '../mock/recipes'
import { assetPath } from '../utils/assetPath'

interface RecipeItemModelProps {
  ingredient: RecipeIngredient
  position: [number, number, number]
}

function RecipeItemModel({ ingredient, position }: RecipeItemModelProps) {
  const { scene } = useGLTF(assetPath(ingredient.path))
  const clonedScene = useMemo(() => scene.clone(), [scene])

  return (
    <group position={position}>
      <group
        rotation={[ingredient.rotationX, ingredient.rotationY, ingredient.rotationZ]}
        position={[ingredient.offsetX ?? 0, ingredient.offsetY ?? 0, 0]}
      >
        <Center>
          <primitive object={clonedScene} scale={ingredient.scale * 0.4} />
        </Center>
      </group>
    </group>
  )
}

interface RecipeCanvasProps {
  recipe: Recipe
}

/**
 * ThreeJS Position Constants for Recipe Grid
 *
 * These values align 3D models with the CSS overlay grid.
 *
 * How these values were determined:
 * - Camera: fov=40, z=10 gives visible width ≈ 7.28 ThreeJS units
 * - Canvas width: ~600px, so ~82 pixels per ThreeJS unit
 * - CSS grid: 80px left padding + 164px grid (3×52px + 2×4px gaps) + 16px gap + arrow + result
 *
 * Correlation formula (for future adjustments):
 * - Grid center is ~137px left of canvas center → theoretical: -137/82 ≈ -1.67 units
 * - Result is ~49px right of canvas center → theoretical: 49/82 ≈ 0.60 units
 * - Slot spacing: 56px (52px slot + 4px gap) → theoretical: 56/82 ≈ 0.68 units
 *
 * However, actual values needed are ~3× larger due to how R3F Canvas
 * handles aspect ratio and viewport. The working multiplier is ~3x.
 *
 * Quick estimation: (pixel_offset / 82) * 3 ≈ ThreeJS_units
 */
const GRID_CENTER_X = -5      // Grid center X position (negative = left of canvas center)
const RESULT_X = 1.8          // Result item X position (positive = right of canvas center)
const SLOT_SPACING = 2        // Distance between adjacent grid slots

function RecipeCanvas({ recipe }: RecipeCanvasProps) {
  const fov = 40
  const cameraZ = 10

  const gridCenterX = GRID_CENTER_X
  const resultX = RESULT_X
  const slotSize = SLOT_SPACING

  const gridItems: { ingredient: RecipeIngredient; position: [number, number, number] }[] = []

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const ingredientId = recipe.grid[row]?.[col]
      if (ingredientId && recipe.ingredients[ingredientId]) {
        // col: 0,1,2 -> offset: -1,0,1
        const x = (col - 1) * slotSize + gridCenterX
        const y = (1 - row) * slotSize
        gridItems.push({
          ingredient: recipe.ingredients[ingredientId]!,
          position: [x, y, 0],
        })
      }
    }
  }

  const resultIngredient = recipe.ingredients[recipe.resultId]

  return (
    <Canvas>
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[0, 0, cameraZ]} fov={fov} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <directionalLight position={[-5, 5, -5]} intensity={0.4} />

        {/* Grid items */}
        {gridItems.map((item, idx) => (
          <RecipeItemModel
            key={`${recipe.id}-${idx}`}
            ingredient={item.ingredient}
            position={item.position}
          />
        ))}

        {/* Result item */}
        {resultIngredient && (
          <RecipeItemModel
            ingredient={resultIngredient}
            position={[resultX, 0, 0]}
          />
        )}
      </Suspense>
    </Canvas>
  )
}

interface RecipeSlotProps {
  ingredient: RecipeIngredient | null
  onHover: (ingredient: RecipeIngredient | null, rect: DOMRect | null) => void
}

function RecipeSlot({ ingredient, onHover }: RecipeSlotProps) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ingredient) {
      onHover(ingredient, e.currentTarget.getBoundingClientRect())
    }
  }

  const handleMouseLeave = () => {
    onHover(null, null)
  }

  return (
    <div
      className={`recipe-slot ${ingredient ? 'recipe-slot-filled' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  )
}

interface RecipeCardProps {
  recipe: Recipe
}

function RecipeCard({ recipe }: RecipeCardProps) {
  const [hoveredIngredient, setHoveredIngredient] = useState<RecipeIngredient | null>(null)
  const [tooltipRect, setTooltipRect] = useState<DOMRect | null>(null)

  const handleHover = (ingredient: RecipeIngredient | null, rect: DOMRect | null) => {
    setHoveredIngredient(ingredient)
    setTooltipRect(rect)
  }

  const resultIngredient = recipe.ingredients[recipe.resultId]

  return (
    <div className="recipe-card">
      <div className="recipe-header">
        <Typography variant={TypographyVariant.H3}>{recipe.name}</Typography>
      </div>

      <div className="recipe-content">
        {/* 3D Canvas with all items */}
        <div className="recipe-canvas-wrapper">
          <RecipeCanvas recipe={recipe} />
        </div>

        {/* Overlay grid for hover detection */}
        <div className="recipe-overlay">
          {/* 3x3 crafting grid */}
          <div className="recipe-grid">
            {recipe.grid.map((row, rowIdx) =>
              row.map((ingredientId, colIdx) => (
                <RecipeSlot
                  key={`${rowIdx}-${colIdx}`}
                  ingredient={ingredientId ? recipe.ingredients[ingredientId] ?? null : null}
                  onHover={handleHover}
                />
              ))
            )}
          </div>

          {/* Arrow */}
          <div className="recipe-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>

          {/* Result slot */}
          <div className="recipe-result">
            <RecipeSlot
              ingredient={resultIngredient ?? null}
              onHover={handleHover}
            />
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredIngredient && tooltipRect && (
        <div
          className="recipe-tooltip"
          style={{
            position: 'fixed',
            left: tooltipRect.right + 12,
            top: tooltipRect.top + tooltipRect.height / 2,
            transform: 'translateY(-50%)',
          }}
        >
          <ItemTooltip item={hoveredIngredient.tooltip} />
        </div>
      )}
    </div>
  )
}

export function WikiRecipesPage() {
  usePageTitle()

  return (
    <div className="wiki-page">
      <div className="wiki-header" />

      <div className="wiki-section">
        <Typography variant={TypographyVariant.H2}>Recipes</Typography>
        <div className="recipes-list">
          {RECIPES.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  )
}
