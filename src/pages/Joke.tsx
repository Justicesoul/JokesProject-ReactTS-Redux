import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetJokeByIdQuery } from '../services/jokesProject';

const Joke = () => {
  const navigate = useNavigate();
  const { joke } = useParams<'joke'>() as unknown as { joke: number };
  const { isLoading, isError, data } = useGetJokeByIdQuery(joke);

  useEffect(() => {
    if (!joke) {
      navigate('../../404');
      return;
    }
  }, [joke]);

  if (isError) {
    return <h1>Error!!!!!!!!!!!!!</h1>;
  }

  if (!isLoading && data?.id != joke) {
    navigate('../../404');
  }

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h2>{`Category: ${data?.category}`}</h2>
          <h4>{`Type: ${data?.type}`}</h4>
          <h4>{`Joke: "${data?.joke}"`}</h4>
          <h4>{`Language: ${data?.lang}`}</h4>
          <h4>Suitable for kids: </h4>
          {!data?.safe ? (
            <h1 style={{ color: 'red' }}>🔞</h1>
          ) : (
            <h1 style={{ color: 'green' }}>✔</h1>
          )}
        </div>
      )}
      <div className="row">
        <Link className="button" to="/">
          Back to Main page
        </Link>
      </div>
    </>
  );
};

export default Joke;
