import Spinner from 'react-bootstrap/Spinner';

function Loading({ loaderText, hasText = true }: loaderProps) {
  return (
    <div className='loadingComponent'>
      <Spinner animation='border' role='status' />
      <span className='loaderText'>
        {loaderText ? loaderText : hasText ? <>Loading...</> : <></>}
      </span>
    </div>
  );
}
interface loaderProps {
  loaderText?: string;
  hasText?: boolean;
}
export default Loading;
