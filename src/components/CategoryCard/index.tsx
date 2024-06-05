import { Link } from "react-router-dom";
import { CategoryContainer, CategoryImage } from "./style";

export interface CategoryCardProps {
  title: string;
  link: string;
  cover_img: string;
}

const CategoryCard = (category: CategoryCardProps) => {
  return (
    <Link to={category.link}>
      <CategoryContainer
        title={category.title}
        hoverable
        cover={
          <CategoryImage
            alt={category.title}
            src={category.cover_img}
            preview={false}
          />
        }
      >
        Descubra sobre os personagens.
      </CategoryContainer>
    </Link>
  );
};

export default CategoryCard;