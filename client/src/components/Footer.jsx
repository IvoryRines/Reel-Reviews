export default function Footer() {
  return (
    <div className="flex items-center justify-center bg-red-800 min-h-36 max-h-36">
      <span className="text-white">
        &copy; {new Date().getFullYear()} Reel Ratings. All rights reserved.
      </span>
    </div>
  );
}
