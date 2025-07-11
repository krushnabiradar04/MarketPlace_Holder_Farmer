import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Phone, Star, Calendar, ShoppingBag, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ProductCard } from '../components/ProductCard';
import { ContactFarmerModal } from '../components/ContactFarmerModal';
import toast from 'react-hot-toast';

interface FarmerProfile {
  id: string;
  full_name: string;
  location: string;
  phone: string;
  bio: string;
  is_available: boolean;
  created_at: string;
}

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

export function FarmerProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [farmer, setFarmer] = useState<FarmerProfile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactingProduct, setContactingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      loadFarmerProfile();
    }
  }, [id]);

  const loadFarmerProfile = async () => {
    try {
      // Load farmer profile
      const { data: farmerData, error: farmerError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (farmerError) throw farmerError;
      setFarmer(farmerData);

      // Load farmer's products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          profiles!products_farmer_id_fkey (
            full_name,
            location,
            phone,
            is_available
          )
        `)
        .eq('farmer_id', farmerData.user_id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;
      setProducts(productsData || []);

    } catch (error) {
      console.error('Error loading farmer profile:', error);
      toast.error('Failed to load farmer profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!farmer) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Farmer not found</h1>
          <p className="text-gray-600 mt-2">The farmer profile you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Farmer Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-4 rounded-full">
              <User className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{farmer.full_name}</h1>
              <div className="flex items-center space-x-4 mt-2">
                {farmer.location && (
                  <div className="flex items-center space-x-1 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{farmer.location}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {new Date(farmer.created_at).getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
              farmer.is_available 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                farmer.is_available ? 'bg-green-500' : 'bg-gray-500'
              }`}></div>
              <span className="text-sm font-medium">
                {farmer.is_available ? 'Available' : 'Unavailable'}
              </span>
            </div>
            {farmer.phone && (
              <a
                href={`tel:${farmer.phone}`}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center space-x-2"
              >
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </a>
            )}
          </div>
        </div>
        {farmer.bio && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
            <p className="text-gray-700">{farmer.bio}</p>
          </div>
        )}
      </div>

      {/* Farmer's Products */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Products</h2>
          <div className="flex items-center space-x-2 text-gray-600">
            <ShoppingBag className="h-5 w-5" />
            <span>{products.length} products available</span>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No products available</p>
            <p className="text-gray-400 mt-2">This farmer hasn't listed any products yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onContactFarmer={() => setContactingProduct(product)}
                hideFooter={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* Contact Farmer Modal */}
      {contactingProduct && (
        <ContactFarmerModal
          product={contactingProduct}
          onClose={() => setContactingProduct(null)}
        />
      )}
    </div>
  );
}