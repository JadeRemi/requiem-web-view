import { useState } from 'react'
import { Typography, TypographyVariant } from '../components/Typography'
import { CoinViewer } from '../components/CoinViewer'
import { CURRENCY, STORE } from '../config'

type PaymentMethod = 'stripe' | 'spherepay' | null

export function StorePage() {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null)

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
              <div key={amount} className="store-purchase-option">
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
        </section>

        {/* Privileges Table */}
        <section className="store-section">
          <Typography variant={TypographyVariant.H3} className="store-section-title">
            Privileges
          </Typography>
          <table className="store-table">
            <tbody>
              {STORE.ITEMS.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Typography variant={TypographyVariant.Body}>{item.name}</Typography>
                  </td>
                  <td className="store-price-cell">
                    <div className="store-price">
                      <Typography variant={TypographyVariant.Label}>{item.price}</Typography>
                      <span className="store-currency-x-sm">×</span>
                      <CoinViewer size={28} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  )
}
