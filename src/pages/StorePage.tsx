import { useState } from 'react'
import { Typography, TypographyVariant } from '../components/Typography'
import { CoinViewer } from '../components/CoinViewer'
import { CURRENCY, STORE } from '../config'
import { STORE_PRIVILEGES } from '../mock/store'

type PaymentMethod = 'stripe' | 'spherepay' | null
type PurchaseAmount = (typeof STORE.PURCHASE_OPTIONS)[number] | null

export function StorePage() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null)
  const [selectedAmount, setSelectedAmount] = useState<PurchaseAmount>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

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

          {showConfirmButton && (
            <button className="store-confirm-btn">
              Confirm Purchase
            </button>
          )}
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
      </div>
    </div>
  )
}
