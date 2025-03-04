import { FC, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { SignOutButton } from './SignOutButton';
import { PAYPAL_CLIENT_ID, PLANS } from '../config/paypal';
import { useAuth } from '../contexts/AuthContext';

export const PaymentPage: FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'BASIC' | 'PRO' | null>(null);
  const { user } = useAuth();

  const handlePaymentSuccess = async (details: any) => {
    // Aquí implementaremos la lógica después del pago exitoso
    console.log('Pago exitoso:', details);
    
    // Aquí puedes hacer una llamada a tu backend para:
    // 1. Verificar el pago
    // 2. Actualizar el estado del usuario
    // 3. Activar el plan correspondiente
  };

  const handlePaymentError = (error: any) => {
    console.error('Error en el pago:', error);
    // Implementar manejo de errores
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Selecciona tu plan</h1>
          <SignOutButton />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Plan Básico */}
          <div className={`bg-gray-800 rounded-xl p-6 border transition-all ${
            selectedPlan === 'BASIC' ? 'border-purple-500' : 'border-purple-500/30'
          }`}>
            <h2 className="text-2xl font-bold mb-4">Plan Básico</h2>
            <div className="text-3xl font-bold mb-4">
              ${PLANS.BASIC.price}<span className="text-lg text-gray-400"> USD</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✓</span>
                <span>Entrenamiento de modelo AI</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✓</span>
                <span>10 imágenes generadas</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✓</span>
                <span>Soporte básico</span>
              </li>
            </ul>
            <button 
              onClick={() => setSelectedPlan('BASIC')}
              className={`w-full px-6 py-3 rounded-full transition ${
                selectedPlan === 'BASIC'
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Seleccionar Plan Básico
            </button>
          </div>

          {/* Plan Pro */}
          <div className={`bg-gray-800 rounded-xl p-6 border transition-all ${
            selectedPlan === 'PRO' ? 'border-purple-500' : 'border-purple-500/30'
          }`}>
            <div className="absolute top-0 right-0 bg-purple-500 px-3 py-1 rounded-full text-sm transform translate-x-2 -translate-y-2">
              Popular
            </div>
            <h2 className="text-2xl font-bold mb-4">Plan Pro</h2>
            <div className="text-3xl font-bold mb-4">
              ${PLANS.PRO.price}<span className="text-lg text-gray-400"> USD</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✓</span>
                <span>Entrenamiento de modelo AI</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✓</span>
                <span>50 imágenes generadas</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✓</span>
                <span>Soporte prioritario</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✓</span>
                <span>Estilos personalizados</span>
              </li>
            </ul>
            <button 
              onClick={() => setSelectedPlan('PRO')}
              className={`w-full px-6 py-3 rounded-full transition ${
                selectedPlan === 'PRO'
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              Seleccionar Plan Pro
            </button>
          </div>
        </div>

        {/* PayPal Buttons */}
        {selectedPlan && (
          <div className="mt-8">
            <PayPalScriptProvider options={{ 
              "client-id": PAYPAL_CLIENT_ID,
              currency: "USD"
            }}>
              <PayPalButtons
                style={{ layout: "horizontal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      description: PLANS[selectedPlan].description,
                      amount: {
                        value: PLANS[selectedPlan].price
                      }
                    }]
                  });
                }}
                onApprove={async (data, actions) => {
                  const details = await actions?.order?.capture();
                  await handlePaymentSuccess(details);
                }}
                onError={handlePaymentError}
              />
            </PayPalScriptProvider>
          </div>
        )}

        {/* Información del usuario */}
        <div className="mt-8 text-gray-400 text-sm">
          <p>Usuario: {user?.email}</p>
          <p className="mt-2">
            * Los precios incluyen todos los impuestos aplicables
          </p>
        </div>
      </div>
    </div>
  );
}; 