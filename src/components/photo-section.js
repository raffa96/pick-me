import { Stack } from "./styled";
import Photo from "./photo";

const PhotoSection = ({ row }) => {
  return (
    <Stack justify="flex-start" spacing="20px">
      {row.map((photo) => {
        return <Photo key={photo.id} {...photo} />;
      })}
    </Stack>
  );
};

export default PhotoSection;
