'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Package,
  CheckCircle,
  Clock,
  Truck,
  Home,
  XCircle,
  MapPin,
  CreditCard,
  Calendar,
  Printer,
  MessageSquare,
  AlertCircle,
  ChevronRight,
  RefreshCw,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Check,
  Circle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { checkoutApi } from '../../../lib/api/checkout';
import { useAuth } from '../../../components/contexts/AuthContext';

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image?: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: 'razorpay' | 'cod' | 'upi';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  orderNotes?: string;
  adminNotes?: string;
  trackingNumber?: string;
  shippingProvider?: string;
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;
  cancelledAt?: string;
}

// Timeline steps configuration
const ORDER_TIMELINE_STEPS = [
  {
    key: 'pending',
    label: 'Pending',
    description: 'Order placed, awaiting payment',
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-200'
  },
  {
    key: 'confirmed',
    label: 'Confirmed',
    description: 'Payment received, order confirmed',
    icon: CheckCircle,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-200'
  },
  {
    key: 'processing',
    label: 'Processing',
    description: 'Preparing your order',
    icon: Package,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-200'
  },
  {
    key: 'shipped',
    label: 'Shipped',
    description: 'Order is on the way',
    icon: Truck,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    borderColor: 'border-indigo-200'
  },
  {
    key: 'delivered',
    label: 'Delivered',
    description: 'Order has been delivered',
    icon: Home,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-200'
  }
] as const;

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const orderId = params.id as string;
  const { user } = useAuth();

  useEffect(() => {
    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await checkoutApi.getOrder(orderId);
      
      if (response.success && response.data?.order) {
        setOrder(response.data.order);
      } else {
        throw new Error(response.error || 'Order not found');
      }
    } catch (error: any) {
      console.error('Error loading order:', error);
      setError(error.message || 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
      return;
    }

    try {
      setCancelling(true);
      const response = await checkoutApi.cancelOrder(orderId, 'Changed my mind');
      
      if (response.success) {
        await loadOrder();
      } else {
        alert(response.error || 'Failed to cancel order');
      }
    } catch (error: any) {
      alert(error.message || 'Failed to cancel order');
    } finally {
      setCancelling(false);
    }
  };

  const handlePrintInvoice = () => {
    setPrinting(true);
    setTimeout(() => {
      window.print();
      setPrinting(false);
    }, 500);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'razorpay': return 'Online Payment (Razorpay)';
      case 'cod': return 'Cash on Delivery';
      case 'upi': return 'UPI Payment';
      default: return method;
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Calculate timeline progress
  const getTimelineProgress = () => {
    if (!order || order.orderStatus === 'cancelled') return null;
    
    const currentStepIndex = ORDER_TIMELINE_STEPS.findIndex(step => step.key === order.orderStatus);
    
    return {
      currentStep: currentStepIndex,
      progressPercentage: ((currentStepIndex + 1) / ORDER_TIMELINE_STEPS.length) * 100,
      isComplete: order.orderStatus === 'delivered'
    };
  };

  const canCancelOrder = () => {
    if (!order) return false;
    
    // Only allow cancellation for pending orders with pending payment
    if (order.orderStatus === 'pending' && order.paymentStatus === 'pending') {
      const created = new Date(order.createdAt);
      const now = new Date();
      const diffTime = now.getTime() - created.getTime();
      const diffHours = diffTime / (1000 * 60 * 60);
      return diffHours <= 24; // Within 24 hours
    }
    return false;
  };

  const timelineProgress = getTimelineProgress();

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center">
            <RefreshCw className="w-10 h-10 md:w-12 md:h-12 text-purple-600 animate-spin mx-auto mb-3 md:mb-4" />
            <p className="text-gray-600 text-sm md:text-base">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-white pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 md:w-16 md:h-16 text-red-500 mx-auto mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Order Not Found</h3>
            <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">{error || 'The order you are looking for does not exist.'}</p>
            <Link
              href="/user/orders"
              className="inline-flex items-center px-4 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors font-medium text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2" />
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-24">
      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 md:py-4">
          <nav className="flex items-center text-xs md:text-sm text-gray-600">
            <Link href="/" className="hover:text-purple-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 mx-1.5 md:mx-2 text-gray-400" />
            <Link href="/user/orders" className="hover:text-purple-600 transition-colors">
              My Orders
            </Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 mx-1.5 md:mx-2 text-gray-400" />
            <span className="text-gray-900 font-medium truncate">Order #{order.orderNumber}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-5 md:py-8">
        {/* Header */}
        <div className="mb-5 md:mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 md:mb-2">Order #{order.orderNumber}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                <span className="text-gray-600 text-xs md:text-sm">
                  Placed on {formatDate(order.createdAt)}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs md:text-sm font-medium ${
                  order.orderStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.orderStatus === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                  order.orderStatus === 'processing' ? 'bg-purple-100 text-purple-800' :
                  order.orderStatus === 'shipped' ? 'bg-indigo-100 text-indigo-800' :
                  order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.orderStatus === 'pending' && <Clock className="w-3 h-3 md:w-4 md:h-4" />}
                  {order.orderStatus === 'confirmed' && <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />}
                  {order.orderStatus === 'processing' && <Package className="w-3 h-3 md:w-4 md:h-4" />}
                  {order.orderStatus === 'shipped' && <Truck className="w-3 h-3 md:w-4 md:h-4" />}
                  {order.orderStatus === 'delivered' && <Home className="w-3 h-3 md:w-4 md:h-4" />}
                  {order.orderStatus === 'cancelled' && <XCircle className="w-3 h-3 md:w-4 md:h-4" />}
                  {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                onClick={handlePrintInvoice}
                disabled={printing}
                className="flex-1 md:flex-none px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-xs md:text-sm flex items-center justify-center"
              >
                {printing ? (
                  <RefreshCw className="w-3 h-3 md:w-4 md:h-4 mr-1.5 animate-spin" />
                ) : (
                  <Printer className="w-3 h-3 md:w-4 md:h-4 mr-1.5" />
                )}
                <span className="hidden sm:inline">Print Invoice</span>
                <span className="sm:hidden">Print</span>
              </button>
              
              {canCancelOrder() && (
                <button
                  onClick={handleCancelOrder}
                  disabled={cancelling}
                  className="flex-1 md:flex-none px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-xs md:text-sm flex items-center justify-center"
                >
                  {cancelling ? (
                    <RefreshCw className="w-3 h-3 md:w-4 md:h-4 mr-1.5 animate-spin" />
                  ) : (
                    <XCircle className="w-3 h-3 md:w-4 md:h-4 mr-1.5" />
                  )}
                  <span className="hidden sm:inline">Cancel Order</span>
                  <span className="sm:hidden">Cancel</span>
                </button>
              )}
            </div>
          </div>

          {/* Order Status Timeline */}
          {order.orderStatus !== 'cancelled' && timelineProgress && (
            <>
              {/* Desktop Timeline */}
              <div className="hidden md:block mt-6 md:mt-8">
                <div className="relative">
                  {/* Progress Bar */}
                  <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full -translate-y-1/2"></div>
                  <div 
                    className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-yellow-500 via-blue-500 to-green-500 rounded-full -translate-y-1/2 transition-all duration-500 ease-out"
                    style={{ width: `${timelineProgress.progressPercentage}%` }}
                  ></div>
                  
                  {/* Timeline Steps */}
                  <div className="relative flex justify-between">
                    {ORDER_TIMELINE_STEPS.map((step, index) => {
                      const isActive = index <= timelineProgress.currentStep;
                      const isCurrent = index === timelineProgress.currentStep;
                      const IconComponent = step.icon;
                      
                      return (
                        <div key={step.key} className="flex flex-col items-center relative">
                          {/* Step Circle */}
                          <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 ${
                            isActive
                              ? `${step.bgColor} border-white shadow-lg ${isCurrent ? 'ring-4 ring-offset-2 ring-opacity-50' : ''}`
                              : 'bg-gray-100 border-white'
                          } transition-all duration-300`}>
                            {isActive ? (
                              <Check className={`w-6 h-6 ${step.color}`} />
                            ) : (
                              <IconComponent className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                          
                          {/* Step Label */}
                          <div className="mt-3 text-center">
                            <p className={`font-medium ${isActive ? step.color : 'text-gray-500'}`}>
                              {step.label}
                            </p>
                            {isCurrent && (
                              <p className="text-xs text-gray-600 mt-1">
                                {step.description}
                              </p>
                            )}
                          </div>
                          
                          {/* Connector Arrows (Desktop) */}
                          {index < ORDER_TIMELINE_STEPS.length - 1 && (
                            <div className="absolute left-full top-6 -translate-x-1/2 w-full">
                              <div className="flex items-center">
                                <div className={`flex-1 h-0.5 ${isActive ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-300'}`}></div>
                                <ArrowRight className={`w-5 h-5 ${isActive ? 'text-purple-500' : 'text-gray-300'}`} />
                                <div className={`flex-1 h-0.5 ${index + 1 <= timelineProgress.currentStep ? 'bg-gradient-to-r from-purple-500 to-indigo-500' : 'bg-gray-300'}`}></div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Payment Status */}
                <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        order.paymentStatus === 'paid' ? 'bg-green-100' :
                        order.paymentStatus === 'pending' ? 'bg-yellow-100' :
                        'bg-red-100'
                      }`}>
                        <CreditCard className={`w-5 h-5 ${
                          order.paymentStatus === 'paid' ? 'text-green-600' :
                          order.paymentStatus === 'pending' ? 'text-yellow-600' :
                          'text-red-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Payment: {getPaymentMethodText(order.paymentMethod)}
                        </p>
                        <p className={`text-sm ${
                          order.paymentStatus === 'paid' ? 'text-green-600' :
                          order.paymentStatus === 'Cod' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                        </p>
                      </div>
                    </div>
                    
                    {order.orderStatus === 'pending' && order.paymentStatus === 'pending' && (
                      <Link
                        href={`/user/payment?orderId=${order._id}&orderNumber=${order.orderNumber}&amount=${order.total}`}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm flex items-center"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Complete Payment
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Timeline */}
              <div className="md:hidden mt-6">
                <div className="relative">
                  {/* Progress Bar */}
                  <div className="absolute left-5 top-0 bottom-0 w-1 bg-gray-200"></div>
                  <div 
                    className="absolute left-5 top-0 w-1 bg-gradient-to-b from-yellow-500 via-blue-500 to-green-500 transition-all duration-500 ease-out"
                    style={{ height: `${timelineProgress.progressPercentage}%` }}
                  ></div>
                  
                  {/* Timeline Steps */}
                  <div className="space-y-6 relative">
                    {ORDER_TIMELINE_STEPS.map((step, index) => {
                      const isActive = index <= timelineProgress.currentStep;
                      const isCurrent = index === timelineProgress.currentStep;
                      const IconComponent = step.icon;
                      
                      return (
                        <div key={step.key} className="flex items-start gap-4 relative">
                          {/* Step Circle */}
                          <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-4 flex-shrink-0 ${
                            isActive
                              ? `${step.bgColor} border-white shadow-md ${isCurrent ? 'ring-3 ring-offset-1 ring-opacity-50' : ''}`
                              : 'bg-gray-100 border-white'
                          } transition-all duration-300`}>
                            {isActive ? (
                              <Check className={`w-5 h-5 ${step.color}`} />
                            ) : (
                              <IconComponent className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          
                          {/* Step Content */}
                          <div className={`flex-1 pt-1 ${isCurrent ? 'pb-4' : ''}`}>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className={`font-semibold ${isActive ? step.color : 'text-gray-500'}`}>
                                  {step.label}
                                </p>
                                <p className="text-xs text-gray-600 mt-0.5">
                                  {step.description}
                                </p>
                              </div>
                              {isCurrent && (
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${step.bgColor} ${step.color}`}>
                                  Current
                                </span>
                              )}
                            </div>
                            
                            {/* Current Status Details */}
                            {isCurrent && order.orderStatus === 'shipped' && order.trackingNumber && (
                              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex items-center gap-2 mb-2">
                                  <Truck className="w-4 h-4 text-blue-600" />
                                  <p className="font-medium text-sm text-blue-900">Tracking Information</p>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-xs text-blue-800">Tracking #: {order.trackingNumber}</p>
                                    {order.shippingProvider && (
                                      <p className="text-xs text-blue-700 mt-1">Carrier: {order.shippingProvider}</p>
                                    )}
                                  </div>
                                  <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
                                    Track Order
                                  </button>
                                </div>
                              </div>
                            )}
                            
                            {isCurrent && order.orderStatus === 'delivered' && order.deliveredAt && (
                              <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <div>
                                    <p className="font-medium text-sm text-green-900">Delivered Successfully</p>
                                    <p className="text-xs text-green-800 mt-0.5">
                                      On {formatDate(order.deliveredAt)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Payment Status Mobile */}
                <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-gray-900">Payment</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                      order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {getPaymentMethodText(order.paymentMethod)}
                  </p>
                  
                  {order.orderStatus === 'pending' && order.paymentStatus === 'pending' && (
                    <Link
                      href={`/user/payment?orderId=${order._id}&orderNumber=${order.orderNumber}&amount=${order.total}`}
                      className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm flex items-center justify-center"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Complete Payment
                    </Link>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Cancelled Order Message */}
          {order.orderStatus === 'cancelled' && (
            <div className="mt-6 p-4 md:p-6 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-3">
                <XCircle className="w-6 h-6 md:w-8 md:h-8 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-red-900 text-sm md:text-base">Order Cancelled</h3>
                  <p className="text-red-700 text-xs md:text-sm mt-1">
                    This order was cancelled on {order.cancelledAt ? formatDate(order.cancelledAt) : formatDate(order.updatedAt)}.
                    {order.paymentStatus === 'paid' && ' Your refund will be processed within 5-7 business days.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {/* Left Column - Order Items */}
          <div className="lg:col-span-2 space-y-5 md:space-y-6">
            {/* Order Items - Mobile Accordion */}
            <div className="md:hidden bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('items')}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <h2 className="font-bold text-gray-900">Order Items ({order.items.length})</h2>
                {expandedSection === 'items' ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>
              
              {expandedSection === 'items' && (
                <div className="px-4 pb-4 space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.productName}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          ) : (
                            <Package className="w-6 h-6 text-gray-400 absolute inset-0 m-auto" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold text-gray-900 text-sm truncate">{item.productName}</h3>
                              <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                                <span>Qty: {item.quantity}</span>
                                <span>Price: ₹{item.price.toLocaleString()}</span>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-bold text-gray-900 text-sm">
                                ₹{(item.quantity * item.price).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Order Notes */}
                  {order.orderNotes && (
                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-2 mb-1.5">
                        <MessageSquare className="w-3 h-3 text-yellow-600" />
                        <h3 className="font-bold text-gray-900 text-sm">Order Notes</h3>
                      </div>
                      <p className="text-gray-700 text-sm">{order.orderNotes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Order Items - Desktop */}
            <div className="hidden md:block bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items</h2>
              
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.productName}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <Package className="w-8 h-8 text-gray-400 absolute inset-0 m-auto" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900">{item.productName}</h3>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <span>Quantity: {item.quantity}</span>
                              <span>Price: ₹{item.price.toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">
                              ₹{(item.quantity * item.price).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Notes */}
              {order.orderNotes && (
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-yellow-600" />
                    <h3 className="font-bold text-gray-900">Order Notes</h3>
                  </div>
                  <p className="text-gray-700">{order.orderNotes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Summary & Info */}
          <div className="space-y-5 md:space-y-6">
            {/* Order Summary - Mobile Accordion */}
            <div className="md:hidden bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('summary')}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <h2 className="font-bold text-gray-900">Order Summary</h2>
                {expandedSection === 'summary' ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>
              
              {expandedSection === 'summary' && (
                <div className="px-4 pb-4">
                  <div className="space-y-2.5">
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">Subtotal ({order.items.length} items)</span>
                      <span className="font-medium text-sm">₹{order.subtotal.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">Shipping</span>
                      <span className="font-medium text-sm">{order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee.toLocaleString()}`}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">Tax (18% GST)</span>
                      <span className="font-medium text-sm">₹{order.tax.toLocaleString()}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-2.5">
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-900">Total Amount</span>
                        <div className="text-right">
                          <span className="text-lg font-bold text-gray-900">
                            ₹{order.total.toLocaleString()}
                          </span>
                          <p className="text-xs text-gray-500">Inclusive of all taxes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Shipping Address - Mobile Accordion */}
            <div className="md:hidden bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('address')}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <h2 className="font-bold text-gray-900">Shipping Address</h2>
                </div>
                {expandedSection === 'address' ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>
              
              {expandedSection === 'address' && (
                <div className="px-4 pb-4 space-y-2">
                  <p className="font-medium text-gray-900 text-sm">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {order.shippingAddress.address}
                    {order.shippingAddress.apartment && `, ${order.shippingAddress.apartment}`}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zipCode}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {order.shippingAddress.country}
                  </p>
                  <div className="pt-2 border-t border-gray-200 space-y-1">
                    <p className="text-gray-700 text-sm">
                      📞 {order.shippingAddress.phone}
                    </p>
                    <p className="text-gray-700 text-sm">
                      ✉️ {order.shippingAddress.email}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Right Column */}
            <div className="hidden md:block space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({order.items.length} items)</span>
                    <span className="font-medium">₹{order.subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee.toLocaleString()}`}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (18% GST)</span>
                    <span className="font-medium">₹{order.tax.toLocaleString()}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-900">Total Amount</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{order.total.toLocaleString()}
                        </span>
                        <p className="text-xs text-gray-500">Inclusive of all taxes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  <p className="text-gray-700">
                    {order.shippingAddress.address}
                    {order.shippingAddress.apartment && `, ${order.shippingAddress.apartment}`}
                  </p>
                  <p className="text-gray-700">
                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zipCode}
                  </p>
                  <p className="text-gray-700">
                    {order.shippingAddress.country}
                  </p>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-gray-700">
                      📞 {order.shippingAddress.phone}
                    </p>
                    <p className="text-gray-700">
                      ✉️ {order.shippingAddress.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900">Payment Information</h2>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium">{getPaymentMethodText(order.paymentMethod)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                      order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
                <h3 className="font-bold text-gray-900 mb-3">Need Help?</h3>
                <p className="text-gray-700 mb-4 text-sm">
                  If you have any questions about your order, please contact our customer support.
                </p>
                <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Contact Support
                </button>
              </div>
            </div>

            {/* Mobile Need Help */}
            <div className="md:hidden bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 p-4">
              <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-700 mb-3 text-sm">
                Questions about your order? Contact our customer support.
              </p>
              <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}