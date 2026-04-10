import Link from "next/link";
import {
  Settings,
  Package,
  Clock,
  Star,
  Heart,
  LogOut,
  ChevronRight,
  LucideIcon,
} from "lucide-react";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  count: number | null;
  href: string;
}

const mockUser = {
  name: "John Doe",
  major: "Computer Science",
  year: "3rd Year",
  rating: 4.9,
  reviews: 24,
  initials: "JD",
  stats: {
    listed: 12,
    rented: 28,
    earned: 340,
  },
};

const menuItems: MenuItem[] = [
  { icon: Package, label: "My Tools",   count: 5,    href: "/profile/tools" },
  { icon: Clock,   label: "My Orders",  count: 3,    href: "/profile/orders" },
  { icon: Star,    label: "My Ratings", count: null, href: "/profile/ratings" },
  { icon: Heart,   label: "Wishlist",   count: 12,   href: "/profile/wishlist" },
];

export default function ProfilePage() {
  const { name, major, year, rating, reviews, initials, stats } = mockUser;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Gradient Header */}
      <div className="gradient-hero px-5 pt-8 pb-12 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-bold text-primary-foreground">Profile</h1>
          <button className="w-10 h-10 rounded-xl glass flex items-center justify-center">
            <Settings className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-3xl bg-primary-foreground/20 flex items-center justify-center border-2 border-primary-foreground/30">
            <span className="text-3xl font-extrabold text-primary-foreground">
              {initials}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-primary-foreground">{name}</h2>
            <p className="text-primary-foreground/70 text-sm">
              {major} • {year}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3.5 h-3.5 fill-accent text-accent" />
              <span className="text-sm font-bold text-primary-foreground">{rating}</span>
              <span className="text-xs text-primary-foreground/60">• {reviews} reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 -mt-6">
        <div className="floating-card flex items-center justify-around py-5">
          <div className="text-center">
            <p className="text-xl font-extrabold text-primary">{stats.listed}</p>
            <p className="text-xs text-muted-foreground">Listed</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-xl font-extrabold text-primary">{stats.rented}</p>
            <p className="text-xs text-muted-foreground">Rented</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-xl font-extrabold text-accent">${stats.earned}</p>
            <p className="text-xs text-muted-foreground">Earned</p>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="px-5 md:px-8 mt-6 space-y-2 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
        {menuItems.map(({ icon: Icon, label, count, href }: MenuItem) => (
          <Link
            key={label}
            href={href}
            className="floating-card flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <span className="flex-1 font-semibold text-sm text-foreground">
              {label}
            </span>
            {count !== null && (
              <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {count}
              </span>
            )}
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Link>
        ))}
      </div>

      {/* Sign Out */}
      <div className="px-5 mt-6 mb-4">
        <button className="w-full floating-card flex items-center justify-center gap-2 text-destructive font-semibold text-sm">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

    </div>
  );
}