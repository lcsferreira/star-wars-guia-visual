import { Card } from "antd";
import { Link } from "react-router-dom";
import styles from "../styles/components/CategoryCard.module.css";

export interface CategoryCardProps {
  title: string;
  link: string;
  cover_img: string;
}

const CategoryCard = (category: CategoryCardProps) => {
  return (
    <Link to={category.link}>
      <Card
        className={styles.card}
        title={category.title}
        hoverable
        cover={
          <img
            className={styles.cover}
            alt={category.title}
            src={category.cover_img}
          />
        }
      >
        Descubra sobre os personagens.
      </Card>
    </Link>
  );
};

export default CategoryCard;
