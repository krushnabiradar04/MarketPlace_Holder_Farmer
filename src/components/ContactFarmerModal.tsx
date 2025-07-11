import React, { useState } from 'react';
import { X, Phone, Mail, MessageCircle, MapPin, Star, User } from 'lucide-react';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  quantity_available: number;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  farmer_id: string;
  profiles: {
    full_name: string;
    location: string;
    phone: string;
    is_available: boolean;
  };
}

interface ContactFarmerModalProps {
  product: Product;
  onClose: () => void;
}

export function ContactFarmerModal({ product, onClose }: ContactFarmerModalProps) {
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleCall = () => {
    if (product.profiles.phone) {
      window.location.href = `tel:${product.profiles.phone}`;
    } else {
      toast.error('Phone number not available');
    }
  };

  const handleEmail = () => {
    const subject = `Inquiry about ${product.name}`;
    const body = `Hello ${product.profiles.full_name},\n\nI'm interested in purchasing ${quantity} ${product.unit} of your ${product.name} at $${product.price} per ${product.unit}.\n\n${message}\n\nThank you!`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSendMessage = () => {
    // In a real app, this would send a message through the platform
    toast.success('Message sent to farmer!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Contact Farmer</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Product Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-4">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-16 w-16 object-cover rounded-lg"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-gray-600">{product.category}</p>
                <p className="text-green-600 font-semibold">
                  ${product.price} per {product.unit}
                </p>
              </div>
            </div>
          </div>

          {/* Farmer Info */}
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{product.profiles.full_name}</h4>
                  {product.profiles.location && (
                    <div className="flex items-center space-x-1 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{product.profiles.location}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                product.profiles.is_available 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  product.profiles.is_available ? 'bg-green-500' : 'bg-gray-500'
                }`}></div>
                <span className="text-sm font-medium">
                  {product.profiles.is_available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity Needed
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                max={product.quantity_available}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <span className="text-gray-600">{product.unit}</span>
              <span className="text-gray-500">
                (Max: {product.quantity_available} {product.unit})
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Total: ${(product.price * quantity).toFixed(2)}
            </p>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message (Optional)
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Add any special requests or questions..."
            />
          </div>

          {/* Contact Options */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 mb-3">Contact Options</h4>
            
            <button
              onClick={handleCall}
              disabled={!product.profiles.phone}
              className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Phone className="h-5 w-5" />
              <span>Call Now</span>
            </button>

            <button
              onClick={handleEmail}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>Send Email</span>
            </button>

            <button
              onClick={handleSendMessage}
              className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Send Platform Message</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}