import { Link } from 'react-router-dom';

const ServiceMenu = ({ services }) => (
  <section className="flex flex-wrap justify-between md:justify-start gap-x-6 gap-y-8">
    {services?.map((item, index) => (
      <Link to={`/transaction/${item.service_code}`} key={index} className="flex flex-col items-center gap-2 w-17.5 text-center cursor-pointer group">
        <div className="w-14 h-14 flex items-center justify-center bg-gray-50 rounded-lg transition-transform group-hover:-translate-y-1">
          <img src={item.service_icon} alt={item.service_name} className="w-12 h-12 object-contain" />
        </div>
        <span className="text-[11px] font-medium text-gray-700 leading-tight">{item.service_name}</span>
      </Link>
    ))}
  </section>
);

export default ServiceMenu;
