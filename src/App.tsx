import { useRef, useState } from "react";

const emptyImage = new Image(0, 0);

const images = [
  "https://images.unsplash.com/photo-1448375240586-882707db888b",
  "https://images.unsplash.com/photo-1511497584788-876760111969",
  "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  "https://images.unsplash.com/photo-1534269222346-5a896154c41d",
  "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc",
  "https://images.unsplash.com/photo-1511142878591-5040f0bdaadd",
];

function App() {
  const scrollDivRef = useRef<HTMLDivElement>(null);
  const lastXRef = useRef(0);
  const [moving, setMoving] = useState(false);

  const handleDragStart: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.dataTransfer.setDragImage(emptyImage, 0, 0);
    lastXRef.current = e.clientX;
    setMoving(true);
  };

  const handleDrag: React.DragEventHandler<HTMLDivElement> = (e) => {
    if (scrollDivRef.current == null || e.clientX === 0) return;
    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    scrollDivRef.current.scrollBy({
      left: -deltaX,
    });
  };

  const handleDragEnd: React.DragEventHandler<HTMLDivElement> = (e) => {
    setMoving(false);
  };

  return (
    <div className="h-screen bg-zinc-900 text-white flex flex-col">
      <header className="h-8 bg-zinc-800 flex items-center justify-center">
        Horizontally Draggable Gallery Demo
      </header>
      <main className="flex-grow flex flex-col">
        <h1 className="text-2xl p-4">Forest Images</h1>
        <div
          draggable
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          ref={scrollDivRef}
          className={`z-50 p-4 h-60 flex flex-row overflow-x-auto items-stretch gap-4 ${
            moving ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {images.map((image) => (
            <span className="aspect-video">
              <img
                draggable={false}
                className="w-full h-full object-cover"
                src={image + "?auto=format&fit=crop&w=800&h=450&q=80"}
              />
            </span>
          ))}
        </div>
      </main>
      <footer className="sticky top-[100vh] h-8 bg-zinc-800 flex items-center justify-center">
        Wild Gallery!
      </footer>
    </div>
  );
}

export default App;
