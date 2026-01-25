import { useState } from 'react'
import { Typography, TypographyVariant } from '../components/Typography'
import { usePageTitle } from '../hooks/usePageTitle'
import { Modal } from '../components/Modal'
import { AyumPracticeModalContent } from '../components/AyumPracticeModal'
import '../styles/pages/wiki.css'

export function WikiAbilitiesPage() {
  usePageTitle('Wiki - Abilities')

  const [isAyumModalOpen, setIsAyumModalOpen] = useState(false)

  return (
    <div className="wiki-page">
      <div className="wiki-header" />

      <div className="wiki-section">
        <div className="abilities-content">
          <button
            className="ability-class-button"
            onClick={() => setIsAyumModalOpen(true)}
          >
            <Typography variant={TypographyVariant.Body}>Ayum Practice</Typography>
          </button>
        </div>
      </div>

      <Modal isOpen={isAyumModalOpen} onClose={() => setIsAyumModalOpen(false)}>
        <AyumPracticeModalContent onClose={() => setIsAyumModalOpen(false)} />
      </Modal>
    </div>
  )
}
