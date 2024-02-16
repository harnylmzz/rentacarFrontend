import { useEffect, useState } from "react";
import CategoryService from "../../../services/CategoryService/CategoryService";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../models/responses/category/GetAllCategoryResponses";
import ColorService from "../../../services/ColorService/ColorService";

export default function FilterSidebar() {
  interface Color {
    id: number;
    name: string;
  }

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sliderValue, setSliderValue] = useState(50);
  const [categories, setCategories] = useState<Category[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let categoryService = new CategoryService();
    categoryService
      .getAllCategories()
      .then((result) => setCategories(result.data.data));
  }, []);
  useEffect(() => {
    let colorService = new ColorService();
    colorService.getAllColors().then((result) => setColors(result.data.data));
  }, []);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(parseInt(event.target.value));
  };

  const handleCategoryClick = (id: number) => {
    navigate(`/category-list/${id}`);
    setSelectedCategory(id.toString());
  };
  const handleColorClick = (id: number) => {
    navigate(`/color-list/${id}`);
    setSelectedCategory(id.toString());
  };

  return (
    <div className="basis-1/4  text-gray-500 ">
      <div className="flex flex-wrap md:flex md:flex-col md:flex-nowrap md:space-y-10 bg-white p-5 rounded-lg">
        <div className="basis-1/2 flex flex-col space-y-2">
          <h4 className="text-xs text-gray-400 tracking-wider">TYPE</h4>
          {categories.map((category: Category) => (
            <div key={category.id} className="mb-4">
              <label className="block">
                <input
                  className="mr-2"
                  type="checkbox"
                  value={category.id}
                  onChange={() => handleCategoryClick(category.id)}
                />
                <span
                  className={`cursor-pointer ${
                    selectedCategory === category.name ? "font-bold" : ""
                  }`}
                >
                  {category.name}
                </span>
              </label>
            </div>
          ))}
        </div>
        {/* <div className="basis-1/2 flex flex-col space-y-2">
          <h4 className="text-xs text-gray-400 tracking-wider">CAPACİTY</h4>
          <label>
            <input className="mr-2" type="checkbox" value="audi" />2 Person
          </label>
          <label>
            <input className="mr-2" type="checkbox" value="audi" />4 Person
          </label>
          <label>
            <input className="mr-2" type="checkbox" value="audi" />6 Person
          </label>
        </div> */}
        <div className="flex basis-1/2 flex-col space-y-2 mt-5 md:mt-0">
          <h4 className="text-xs text-gray-400 tracking-wider">COLOR</h4>
          <label>
            {colors.map((color: Color) => (
              <div key={color.id} className="mb-4">
                <label className="block">
                  <input
                    className="mr-2"
                    type="checkbox"
                    value={color.id}
                    onChange={() => handleColorClick(color.id)}
                  />
                  <span
                    className={`cursor-pointer ${
                      selectedCategory === color.name ? "font-bold" : ""
                    }`}
                  >
                    {color.name}
                  </span>
                </label>
              </div>
            ))}
          </label>
        </div>
        <div className="flex basis-1/2 flex-col space-y-2 mt-5 md:mt-0">
          <h3 className="text-xs text-gray-400 tracking-wider">FUEL</h3>
          <label>
            <input className="mr-2" type="checkbox" />
            Gasoline
          </label>
          <label>
            <input className="mr-2" type="checkbox" />
            Diesel
          </label>
          <label>
            <input className="mr-2" type="checkbox" />
            LPG
          </label>
          <label>
            <input className="mr-2" type="checkbox" />
            Electricity
          </label>
        </div>
        <div className="flex flex-col mt-5 md:mt-5">
          <h3 className=" text-xs text-gray-400 tracking-wider">PRICE</h3>

          <label className=" flex flex-col">
            <input
              type="range"
              min="90"
              max="600"
              value={sliderValue}
              onChange={handleSliderChange}
              className="my-2"
            />
            <p className="text-sm">PRICE {sliderValue}$</p>
          </label>
        </div>
      </div>
    </div>
  );
}
