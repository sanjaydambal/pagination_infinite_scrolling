import { useEffect, useState } from 'react';
import './App.css'; // Make sure this path is correct

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`);
      const data = await res.json();
      if (data && data.products) {
        setProducts(prevProducts => [...prevProducts, ...data.products]); // Append products for infinite scroll
        setTotalPages(Math.ceil(data.total / 10));
      } else {
        console.log('Invalid URL');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight && page < totalPages) {
        setPage(prevPage => prevPage + 1); // Load next page on scroll
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, totalPages]);

  return (
    <div className="App">
      <div className="products">
        {products.map((pdt) => (
          <span className="pdt__description" key={pdt.id}>
            <img src={pdt.thumbnail} alt={pdt.title} />
            <span>{pdt.title}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;
