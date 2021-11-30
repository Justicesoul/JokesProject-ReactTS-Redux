import { useGetCategoriesQuery } from './services/jokesProject';
import { Routes, Route, Link } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Category from './pages/Category';
import Joke from './pages/Joke';
import Main from './pages/Main';

const App = () => {
  const { isLoading, isError, data } = useGetCategoriesQuery(undefined);

  if (isError) {
    return <h1>Error!!!!!!!!!!!!!</h1>;
  }

  return (
    <div className="container">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <nav>
          {data?.categories.map((item) => {
            return (
              <>
                <Link
                  key={item}
                  className="nav__item"
                  to={`/categories/${item}/`}
                >
                  {item}
                </Link>
              </>
            );
          })}
        </nav>
      )}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/categories/:category/" element={<Category />} />
        <Route path="/categories/:category/:joke" element={<Joke />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
