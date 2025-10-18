const stripe = require('stripe');

// Initialize Stripe with secret key from secrets
let stripeClient = null;

async function initializeStripe(secrets) {
  if (!stripeClient && secrets.STRIPE_SECRET_KEY) {
    stripeClient = stripe(secrets.STRIPE_SECRET_KEY);
  }
  return stripeClient;
}

// Handle Stripe webhooks
async function handleStripeWebhook(event, secrets) {
  const stripeInstance = await initializeStripe(secrets);
  
  if (!stripeInstance) {
    throw new Error('Stripe not configured');
  }

  console.log('Stripe webhook event:', event.type);

  switch (event.type) {
    case 'customer.subscription.created':
      console.log('Subscription created:', event.data.object.id);
      // TODO: Update user subscription status in database
      break;
      
    case 'customer.subscription.updated':
      console.log('Subscription updated:', event.data.object.id);
      // TODO: Update user subscription status in database
      break;
      
    case 'customer.subscription.deleted':
      console.log('Subscription cancelled:', event.data.object.id);
      // TODO: Update user subscription status in database
      break;
      
    case 'invoice.payment_succeeded':
      console.log('Payment succeeded:', event.data.object.id);
      // TODO: Log successful payment
      break;
      
    case 'invoice.payment_failed':
      console.log('Payment failed:', event.data.object.id);
      // TODO: Handle failed payment
      break;
      
    default:
      console.log('Unhandled event type:', event.type);
  }

  return { received: true };
}

// Create Stripe checkout session
async function createCheckoutSession(priceId, customerId, secrets) {
  const stripeInstance = await initializeStripe(secrets);
  
  if (!stripeInstance) {
    throw new Error('Stripe not configured');
  }

  const session = await stripeInstance.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: 'https://joblander.org/dashboard?success=true',
    cancel_url: 'https://joblander.org/pricing?cancelled=true',
  });

  return session;
}

// Get customer portal session
async function createPortalSession(customerId, secrets) {
  const stripeInstance = await initializeStripe(secrets);
  
  if (!stripeInstance) {
    throw new Error('Stripe not configured');
  }

  const session = await stripeInstance.billingPortal.sessions.create({
    customer: customerId,
    return_url: 'https://joblander.org/dashboard',
  });

  return session;
}

module.exports = {
  handleStripeWebhook,
  createCheckoutSession,
  createPortalSession
};
