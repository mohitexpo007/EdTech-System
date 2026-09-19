import Course_Card from "../Course_Card";
import CourseSlider from "../CourseSlider";
import categoryHeroNetwork from "../../../../assets/Images/category-hero-network.png";
import "./CategoryFeature.css";

const resources = (name) => [
  `Doc ${name}`,
  "Cheatsheets",
  "Articles",
  "Community Forums",
  "Projects",
];

export default function CategoryFeature({ catalogPageData }) {
  const category = catalogPageData?.data?.selectedCategory;
  const categoryName = category?.name || "Category";
  const titleParts = categoryName.split(" ");
  const titleLead = titleParts.slice(0, -1).join(" ");
  const titleAccent = titleParts[titleParts.length - 1];

  return (
    <main className="category-feature">
      <section className="category-feature__hero">
        <div className="category-feature__grid" aria-hidden="true" />
        <img className="category-feature__art" src={categoryHeroNetwork} alt="" aria-hidden="true" />
        <div className="category-feature__hero-inner">
          <div className="category-feature__intro">
            <p className="category-feature__crumb">Home <span>/</span> Catalog <span>/</span> <strong>{categoryName}</strong></p>
            <h1>{titleLead && <span>{titleLead} </span>}<em>{titleAccent}</em></h1>
            <p className="category-feature__description">{category?.description || "Discover courses built to help you learn from the fundamentals through advanced concepts."}</p>
          </div>
          <aside className="category-feature__resources">
            <h2>Related resources</h2>
            <ul>{resources(categoryName).map((resource) => <li key={resource}><a href="#course-list">{resource}</a></li>)}</ul>
          </aside>
        </div>
      </section>

      <section id="course-list" className="category-feature__courses">
        <div className="category-feature__section-heading">
          <h2>Courses to get you started</h2>
          <div className="category-feature__tabs" role="tablist" aria-label="Course sort options">
            <button type="button" className="is-active" role="tab" aria-selected="true">Most Popular</button>
            <button type="button" role="tab" aria-selected="false">New</button>
            <button type="button" role="tab" aria-selected="false">Trending</button>
          </div>
        </div>
        <CourseSlider Courses={category?.course} />
      </section>

      <section className="category-feature__courses">
        <h2 className="category-feature__plain-heading">Top Courses in {categoryName}</h2>
        <CourseSlider Courses={catalogPageData?.data?.differentCategory?.course} />
      </section>

      <section className="category-feature__courses category-feature__frequently-bought">
        <h2 className="category-feature__plain-heading">Frequently Bought</h2>
        <div className="category-feature__card-grid">
          {catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course) => <Course_Card course={course} key={course._id} Height="h-[250px]" />)}
        </div>
      </section>
    </main>
  );
}
