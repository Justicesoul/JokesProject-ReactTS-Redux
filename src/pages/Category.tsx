import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetJokeCategoryQuery } from '../services/jokesProject';

const Category = () => {
  const navigate = useNavigate();
  const { category } = useParams<'category'>() as { category: string };
  const { isLoading, isError, data } = useGetJokeCategoryQuery(category);

  useEffect(() => {
    if (!category) {
      navigate('../../404');
      return;
    }
  }, [category]);

  if (isError) {
    return <h1>Error!!!!!!!!!!!!!</h1>;
  }

  if (data?.error) {
    return (
      <>
        <h1>No jokes were found in this category</h1>
        <div className="row">
          <Link className="button" to="/">
            Back to Main page
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {data?.jokes.map(({ joke, category, id }, index) => {
            return (
              <>
                <Link
                  key={index}
                  className="joke"
                  to={`/categories/${category}/${id}`}
                >
                  {`${index + 1}. ${joke}`}
                </Link>
              </>
            );
          })}
        </>
      )}
      <div className="row">
        <Link className="button" to="/">
          Back to Main page
        </Link>
      </div>
    </>
  );
};

export default Category;
