import { useParams } from "react-router-dom";

const Paginated = () => {
  const { page } = useParams();

  return <h1>Paginated Screen: {page}</h1>;
};

export default Paginated;
