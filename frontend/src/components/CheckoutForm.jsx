// import React from 'react';
// import { useCheckout } from '@stripe/react-stripe-js';
// import { PaymentElement } from '@stripe/react-stripe-js';


// const CheckoutForm = () => {
//   const checkout = useCheckout();

//   return (
//     <div style={{ maxWidth: 400, margin: '0 auto' }}>
//       <PaymentElement />
      
//       <p>Total: ${(checkout?.total?.total?.amount / 100).toFixed(2)} {checkout?.currency?.toUpperCase()}</p>
//     </div>
//   );
// };

// export default CheckoutForm;


import React from 'react';
import { PaymentElement, useCheckout } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const checkout = useCheckout();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleClick = async () => {
    setLoading(true);
    const result = await checkout.confirm();
    if (result.type === 'error') {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <form>
      <PaymentElement options={{ layout: 'accordion' }} />
      <button
        disabled={loading}
        onClick={handleClick}
        type="button"
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#635bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {error && <div style={{ color: 'red' }}>{error.message}</div>}
    </form>
  );
};

export default CheckoutForm;

