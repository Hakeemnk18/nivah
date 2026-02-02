import { Link } from "react-router-dom";

type Crumb = {
  label: string;
  to?: string;
};

const AdminBreadcrumb = ({ crumbs }: { crumbs: Crumb[] }) => {
  return (
    <nav className="mb-4 text-sm text-gray-400">
      {crumbs.map((crumb, index) => (
        <span key={index}>
          {crumb.to ? (
            <Link to={crumb.to} className="hover:text-white">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-white">{crumb.label}</span>
          )}

          {index < crumbs.length - 1 && (
            <span className="mx-2">›</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export default AdminBreadcrumb;