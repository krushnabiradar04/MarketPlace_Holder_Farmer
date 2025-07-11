import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, User, ShoppingBag } from 'lucide-react';

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

interface ProductCardProps {
  product: Product;
  onContactFarmer: () => void;
  hideFooter?: boolean;
}

export function ProductCard({ product, onContactFarmer, hideFooter = false }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-2xl font-bold text-green-600">${product.price}</span>
            <span className="text-gray-500 text-sm ml-1">per {product.unit}</span>
          </div>
          <div className="text-sm text-gray-500">
            {product.quantity_available} {product.unit} available
          </div>
        </div>

        {!hideFooter && (
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <Link
                to={`/farmer/${product.farmer_id}`}
                className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
              >
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{product.profiles.full_name}</span>
              </Link>
              <div className="flex items-center space-x-2">
                {product.profiles.location && (
                  <div className="flex items-center space-x-1 text-gray-500">
                    <MapPin className="h-3 w-3" />
                    <span className="text-xs">{product.profiles.location}</span>
                  </div>
                )}
                <div className={`w-2 h-2 rounded-full ${
                  product.profiles.is_available ? 'bg-green-500' : 'bg-gray-400'
                }`} />
              </div>
            </div>
            <button
              onClick={onContactFarmer}
              className="w-full mt-3 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Phone className="h-4 w-4" />
              <span>Contact Farmer</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}