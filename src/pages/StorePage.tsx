import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Typography, TypographyVariant } from '../components/Typography'
import { CoinViewer } from '../components/CoinViewer'
import { FacePreview } from '../components/FacePreview'
import { Tooltip } from '../components/Tooltip'
import { CURRENCY, STORE, ROUTES, DEFAULT_SKIN_HASH } from '../config'
import { STORE_PRIVILEGES } from '../mock/store'
import { MOCK_PURCHASES, PURCHASE_ITEM_NAMES, getPlayerByUuid, type PurchaseEntry } from '../mock/purchases'

type PaymentMethod = 'stripe' | 'spherepay' | null
type PurchaseAmount = (typeof STORE.PURCHASE_OPTIONS)[number] | null

/** Number of purchases to load per page */
const PURCHASES_PAGE_SIZE = 10

/** Initial loading delay to show skeleton */
const INITIAL_LOAD_DELAY = 600

/**
 * Format ISO date string to relative time
 */
function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 60) {
    return `${diffMins}m ago`
  } else if (diffHours < 24) {
    return `${diffHours}h ago`
  } else {
    return `${diffDays}d ago`
  }
}

/**
 * Format ISO date string to readable date (no time)
 */
function formatFullDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/** Coin amount from item code, or null if not a coin purchase */
function getCoinAmount(itemCode: string): number | null {
  const match = itemCode.match(/^coins-(\d+)$/)
  const amount = match?.[1]
  return amount ? parseInt(amount, 10) : null
}

/**
 * Last Purchases List Component
 */
function LastPurchasesList() {
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setInitialLoad(false)
    }, INITIAL_LOAD_DELAY)
    return () => clearTimeout(timer)
  }, [])

  const displayedData = useMemo(() => {
    if (initialLoad) return []
    return MOCK_PURCHASES.slice(0, page * PURCHASES_PAGE_SIZE)
  }, [page, initialLoad])

  const hasMore = !initialLoad && displayedData.length < MOCK_PURCHASES.length

  const handleLoadMore = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setPage((p) => p + 1)
      setLoading(false)
    }, 300)
  }, [])

  return (
    <div className="store-purchases-list">
      {displayedData.map((purchase) => (
        <PurchaseRow key={purchase.id} purchase={purchase} />
      ))}

      {loading && (
        <div className="store-purchases-loading">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="store-purchase-row-skeleton" />
          ))}
        </div>
      )}

      {hasMore && !loading && (
        <button className="store-load-more" onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </div>
  )
}

/**
 * Single purchase row
 */
function PurchaseRow({ purchase }: { purchase: PurchaseEntry }) {
  const player = purchase.uuid ? getPlayerByUuid(purchase.uuid) : null
  const coinAmount = getCoinAmount(purchase.itemCode)
  const itemName = PURCHASE_ITEM_NAMES[purchase.itemCode]

  return (
    <div className="store-purchase-row">
      <div className="store-purchase-user">
        {purchase.uuid && player ? (
          <Link to={`${ROUTES.PROFILE}?uuid=${purchase.uuid}`} className="store-purchase-user-link">
            <FacePreview skinHash={player.skinHash ?? DEFAULT_SKIN_HASH} size={20} />
            <span className="store-purchase-username">{player.username}</span>
          </Link>
        ) : (
          <span className="store-purchase-anonymous">Anonymous</span>
        )}
      </div>
      <div className="store-purchase-item">
        {coinAmount !== null ? (
          <span className="store-purchase-coins">
            +{coinAmount}
            <span className="store-currency-x-sm">×</span>
            <CoinViewer size={20} />
          </span>
        ) : (
          itemName
        )}
      </div>
      <Tooltip content={formatFullDate(purchase.timestamp)} position="top">
        <div className="store-purchase-time">{formatRelativeTime(purchase.timestamp)}</div>
      </Tooltip>
    </div>
  )
}

export function StorePage() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null)
  const [selectedAmount, setSelectedAmount] = useState<PurchaseAmount>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [purchaseAnonymously, setPurchaseAnonymously] = useState(false)
  const checkmarkRef = useRef<HTMLSpanElement>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleAmountClick = (amount: (typeof STORE.PURCHASE_OPTIONS)[number]) => {
    setSelectedAmount(selectedAmount === amount ? null : amount)
  }

  const showConfirmButton = selectedPayment !== null && selectedAmount !== null

  return (
    <div className="store-page">
      <div className="store-content">
        {/* Balance Display */}
        <section className="store-balance-section">
          <div className="store-balance-row">
            <Typography variant={TypographyVariant.Body} className="store-balance-label">
              Current balance:
            </Typography>
            <span className="store-balance-amount">{CURRENCY.MOCK_BALANCE}</span>
            <span className="store-currency-x">×</span>
            <CoinViewer size={36} />
          </div>
        </section>

        {/* Buy More Section */}
        <section className="store-section">
          <div className="store-purchase-options">
            {STORE.PURCHASE_OPTIONS.map((amount) => (
              <div
                key={amount}
                className={`store-purchase-option ${selectedAmount === amount ? 'selected' : ''}`}
                onClick={() => handleAmountClick(amount)}
              >
                <span className="store-purchase-amount">+{amount}</span>
                <span className="store-currency-x-sm">×</span>
                <CoinViewer size={32} />
              </div>
            ))}
          </div>

          <div className="store-payment-control">
            <label
              className={`store-payment-option ${selectedPayment === 'stripe' ? 'active' : ''}`}
              onClick={() => setSelectedPayment(selectedPayment === 'stripe' ? null : 'stripe')}
            >
              Buy with Stripe
            </label>
            <label
              className={`store-payment-option ${selectedPayment === 'spherepay' ? 'active' : ''}`}
              onClick={() => setSelectedPayment(selectedPayment === 'spherepay' ? null : 'spherepay')}
            >
              Buy with SpherePay
            </label>
          </div>

          <div className={`store-confirm-area ${showConfirmButton ? 'store-confirm-area-open' : ''}`}>
            <div className="store-confirm-area-content">
              <button className="store-confirm-btn">
                Confirm Purchase
              </button>

              <Tooltip
                content="You will still receive your purchase, but it will be displayed in the purchase history as anonymous."
                position="top"
                anchorRef={checkmarkRef}
              >
                <label className="store-anonymous-check">
                  <input
                    type="checkbox"
                    checked={purchaseAnonymously}
                    onChange={(e) => setPurchaseAnonymously(e.target.checked)}
                  />
                  <span ref={checkmarkRef} className="store-anonymous-checkmark" />
                  <span className="store-anonymous-label">Purchase anonymously</span>
                </label>
              </Tooltip>
            </div>
          </div>
        </section>

        {/* Privileges */}
        <section className="store-section">
          <Typography variant={TypographyVariant.H3} className="store-section-title">
            Privileges
          </Typography>
          <div className="store-privileges-list">
            {STORE_PRIVILEGES.map((item) => (
              <div
                key={item.id}
                className={`store-privilege-card ${expandedId === item.id ? 'expanded' : ''}`}
                onClick={() => toggleExpand(item.id)}
              >
                <div className="store-privilege-header">
                  <Typography variant={TypographyVariant.Body} className="store-privilege-name">
                    {item.name}
                  </Typography>
                  <div className="store-price">
                    <Typography variant={TypographyVariant.Label}>{item.price}</Typography>
                    <span className="store-currency-x-sm">×</span>
                    <CoinViewer size={24} />
                    <span className={`store-price-period ${item.type !== 'subscription' ? 'invisible' : ''}`}>
                      /mo
                    </span>
                  </div>
                </div>
                <div className={`store-privilege-description ${expandedId === item.id ? 'visible' : ''}`}>
                  {item.description.map((line, i) => (
                    <div key={i} className="store-privilege-item">
                      <span className="store-privilege-dash">—</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Last Purchases */}
        <section className="store-section">
          <Typography variant={TypographyVariant.H3} className="store-section-title">
            Last Purchases
          </Typography>
          <LastPurchasesList />
        </section>
      </div>
    </div>
  )
}
