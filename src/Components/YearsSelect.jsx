import React, { useState, useContext } from 'react';
import { CURRENT_YEAR } from '../Helpers/HelperConstants';
import { MoviesDataContext } from '../Context/MoviesDataContextProvider';

const YearsSelect = () => {
  const movieDataContext = useContext(MoviesDataContext);
  const { selectedYear, setSelectedYear } = movieDataContext;

  const [isOpen, setIsOpen] = useState(false);

  const years = getYears();
  return (
    <div
      className="inline-block bg-slate-900/[.6] flex justify-between items-center py-2 w-32 max-w-32 min-w-32 pl-4 pr-3 relative rounded-full text-sm font-robotoflex font-semibold cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span>{selectedYear}</span>
      <i
        className={`fa-solid fa-angle-up transition-all ${
          isOpen ? 'rotate-180' : 'rotate-0'
        } `}
      ></i>

      <div
        className={`absolute top-[110%] left-0 w-full bg-slate-900/[.6] shadow-[0_0_10px_3px_rgba(0,0,0,0.4)] rounded-xl overflow-hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="h-56 overflow-auto">
          {years.map((year) => {
            return (
              <li
                key={year}
                value={year.toString()}
                className={`hover:bg-slate-600/[.7] transition-all cursor-pointer py-2 pl-4 ${
                  selectedYear == year ? 'bg-slate-500/[.8]' : ''
                }`}
                onClick={(e) => {
                  if (e.target.value != selectedYear) {
                    setSelectedYear(e.target.value);
                  }
                }}
              >
                {year}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default YearsSelect;

const getYears = () => {
  const years = [];
  for (let i = 0; i < 20; i++) {
    years.push(CURRENT_YEAR - i);
  }
  return years;
};
