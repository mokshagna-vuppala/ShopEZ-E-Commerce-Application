import React, { useEffect, useState } from 'react';
import '../styles/Products.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Products = (props) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const sampleProducts = [
    {
      _id: '1',
      mainImg: 'https://ii1.pepperfry.com/media/catalog/product/k/a/494x544/kaylee-velvet-3-seater-sofa-in-teal-blue-colour-kaylee-velvet-3-seater-sofa-in-teal-blue-colour-czhsyn.jpg',
      title: 'Comfortable Sofa Set',
      description: 'Experience luxury with this modern sofa set, perfect for your living room.',
      price: 25000,
      discount: 15,
      category: 'Furniture',
      gender: 'Unisex'
    },
    {
      _id: '2',
      mainImg: 'https://m.media-amazon.com/images/I/71QFx-Hs4nL._AC_UF894,1000_QL80_.jpg',
      title: 'Elegant Dining Table',
      description: 'Upgrade your dining experience with this stylish dining table for family meals.',
      price: 18000,
      discount: 10,
      category: 'Furniture',
      gender: 'Unisex'
    },
    {
      _id: '3',
      mainImg: 'https://images-cdn.ubuy.co.in/635aafad94b48e6fab5b5c72-canon-eos-m50-mark-ii-content-creator.jpg',
      title: 'Professional Camera Kit',
      description: 'Capture stunning moments with this high-performance camera kit for photographers.',
      price: 55000,
      discount: 12,
      category: 'Electronics',
      gender: 'Unisex'
    },
    {
      _id: '4',
      mainImg: 'https://pyxis.nymag.com/v1/imgs/921/c0c/d56eeaa21522d8918ee1cedde9dea91293.rsquare.w600.jpg',
      title: 'Smart Fitness Tracker',
      description: 'Stay fit and healthy with this advanced fitness tracker that monitors your activities.',
      price: 4000,
      discount: 20,
      category: 'Electronics',
      gender: 'Unisex'
    },
    {
      _id: '5',
      mainImg: 'https://assets.ajio.com/medias/sys_master/root/20230526/Hycs/6470b726d55b7d0c6316ecda/-473Wx593H-466200496-grey-MODEL.jpg',
      title: 'Designer Handbag',
      description: 'Accessorize with this premium designer handbag, perfect for any occasion.',
      price: 15000,
      discount: 8,
      category: 'Fashion',
      gender: 'Women'
    },
    {
      _id: '6',
      mainImg: 'https://m.media-amazon.com/images/I/71NZxcWS+rS._AC_UY350_.jpg',
      title: 'Classic Men\'s Watch',
      description: 'Enhance your style with this classic men\'s watch, a blend of elegance and functionality.',
      price: 12000,
      discount: 15,
      category: 'Fashion',
      gender: 'Men'
    },
    {
      _id: '7',
      mainImg: 'https://m.media-amazon.com/images/I/71oCc2P+-7L._AC_UF1000,1000_QL80_.jpg',
      title: 'Wireless Headphones',
      description: 'Immerse yourself in music with these high-quality wireless headphones, designed for comfort.',
      price: 6000,
      discount: 25,
      category: 'Electronics',
      gender: 'Unisex'
    },
    {
      _id: '8',
      mainImg: 'https://carltonlondon.co.in/cdn/shop/files/a7404069.jpg?v=1687347304',
      title: 'Luxury Perfume Set',
      description: 'Indulge in luxury with this exclusive perfume set, a perfect gift for any occasion.',
      price: 8000,
      discount: 18,
      category: 'Fashion',
      gender: 'Unisex'
    },
    {
      _id: '9',
      mainImg: 'https://m.media-amazon.com/images/I/61UaIPr0l-L._AC_UF894,1000_QL80_.jpg',
      title: 'Gourmet Coffee Machine',
      description: 'Start your day right with this gourmet coffee machine, offering the perfect brew every time.',
      price: 25000,
      discount: 10,
      category: 'Electronics',
      gender: 'Unisex'
    },
    {
      _id: '10',
      mainImg: 'https://d2j6dbq0eux0bg.cloudfront.net/images/24989555/1309300078.jpg',
      title: 'Outdoor Adventure Backpack',
      description: 'Explore the outdoors with this durable backpack, equipped for all your adventures.',
      price: 5000,
      discount: 20,
      category: 'Sports Equipments',
      gender: 'Unisex'
    },
    {
      _id: '11',
      mainImg: 'https://www.getsupp.com/static/media/__resized/images/products/AWEI2S9XQAB6TSEX9-d3a92212-c8ca-4ed0-acce-fae18fdbfd4f-thumbnail_webp-1080x1080-70.webp',
      title: 'MyFitness - Original Peanut Butter',
      description: ' with 25g Protein, Nut Butter Spread - for Maintain Good Cholesterol, Blood Sugar, and Blood Pressure - 2500 gm',
      price: 1300,
      discount: 25,
      category: 'Groceries',
      gender: 'Unisex'
    }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-products');
      const fetchedProducts = response.data.length > 0 ? response.data : sampleProducts;

      if (props.category === 'all') {
        setProducts(fetchedProducts);
        setVisibleProducts(fetchedProducts);
      } else {
        const filteredProducts = fetchedProducts.filter(product => product.category === props.category);
        setProducts(filteredProducts);
        setVisibleProducts(filteredProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(sampleProducts);
      setVisibleProducts(props.category === 'all' ? sampleProducts : []);
    }

    try {
      const categoryResponse = await axios.get('http://localhost:6001/fetch-categories');
      setCategories(categoryResponse.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const [sortFilter, setSortFilter] = useState('popularity');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);

  const handleCategoryCheckBox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCategoryFilter([...categoryFilter, value]);
    } else {
      setCategoryFilter(categoryFilter.filter(category => category !== value));
    }
  };

  const handleGenderCheckBox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setGenderFilter([...genderFilter, value]);
    } else {
      setGenderFilter(genderFilter.filter(gender => gender !== value));
    }
  };

  const handleSortFilterChange = (e) => {
    const value = e.target.value;
    setSortFilter(value);
    if (value === 'low-price') {
      setVisibleProducts([...visibleProducts].sort((a, b) => a.price - b.price));
    } else if (value === 'high-price') {
      setVisibleProducts([...visibleProducts].sort((a, b) => b.price - a.price));
    } else if (value === 'discount') {
      setVisibleProducts([...visibleProducts].sort((a, b) => b.discount - a.discount));
    }
  };

  useEffect(() => {
    if (categoryFilter.length > 0 && genderFilter.length > 0) {
      setVisibleProducts(products.filter(product => categoryFilter.includes(product.category) && genderFilter.includes(product.gender)));
    } else if (categoryFilter.length === 0 && genderFilter.length > 0) {
      setVisibleProducts(products.filter(product => genderFilter.includes(product.gender)));
    } else if (categoryFilter.length > 0 && genderFilter.length === 0) {
      setVisibleProducts(products.filter(product => categoryFilter.includes(product.category)));
    } else {
      setVisibleProducts(products);
    }
  }, [categoryFilter, genderFilter, products]);

  return (
    <div className="products-container">
      <div className="products-filter">
        <h4>Filters</h4>
        <div className="product-filters-body">
          <div className="filter-sort">
            <h6>Sort By</h6>
            <select onChange={handleSortFilterChange} value={sortFilter}>
              <option value="popularity">Popularity</option>
              <option value="low-price">Price: Low to High</option>
              <option value="high-price">Price: High to Low</option>
              <option value="discount">Discount</option>
            </select>
          </div>
          <div className="filter-category">
            <h6>Category</h6>
            <div className="sub-filter-body">
              {categories.map((category) => (
                <div key={category}>
                  <input type="checkbox" id={category} value={category} onChange={handleCategoryCheckBox} />
                  <label htmlFor={category}>{category}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="filter-gender">
            <h6>Gender</h6>
            <div className="sub-filter-body">
              <div>
                <input type="checkbox" id="Men" value="Men" onChange={handleGenderCheckBox} />
                <label htmlFor="Men">Men</label>
              </div>
              <div>
                <input type="checkbox" id="Women" value="Women" onChange={handleGenderCheckBox} />
                <label htmlFor="Women">Women</label>
              </div>
              <div>
                <input type="checkbox" id="Unisex" value="Unisex" onChange={handleGenderCheckBox} />
                <label htmlFor="Unisex">Unisex</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="products-body">
        <h3>Products</h3>
        <div className="products">
          {visibleProducts.map((product) => (
            <div key={product._id} className="product-item">
              <div className="product" onClick={() => navigate(`/product/${product._id}`)}>
                <img src={product.mainImg} alt={product.title} />
                <div className="product-data">
                  <h6>{product.title}</h6>
                  <p>{product.description}</p>
                  <h5>
                    <s>Rs.{product.price}</s>{product.discount}%off
                    <p>Rs.{product.price - (product.price * product.discount / 100)}</p>
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
