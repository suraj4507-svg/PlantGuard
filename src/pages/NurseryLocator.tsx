import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Locate } from "lucide-react";
import Layout from "@/components/Layout";
import NurseryCard from "@/components/NurseryCard";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const nurseries = [
  { name: "Rajashri Nursery", address: "Near Katraj Snake Park, Katraj, Pune 411046", phone: "+91 98230 12345", rating: 4.8, distance: "1.2 km", lat: 18.4575, lng: 73.8674 },
  { name: "Vrundavan Nursery", address: "Sinhagad Road, Vadgaon Budruk, Pune 411041", phone: "+91 90284 56789", rating: 4.6, distance: "2.5 km", lat: 18.4832, lng: 73.8210 },
  { name: "Nisarg Nursery", address: "Baner Road, Near Pancard Club, Baner, Pune 411045", phone: "+91 88058 67890", rating: 4.9, distance: "3.1 km", lat: 18.5590, lng: 73.7868 },
  { name: "Samarth Nursery", address: "Pune-Satara Road, Dhankawadi, Pune 411043", phone: "+91 70209 34567", rating: 4.5, distance: "4.0 km", lat: 18.4625, lng: 73.8507 },
  { name: "Green Magic Nursery", address: "Koregaon Park, Lane 7, Pune 411001", phone: "+91 95527 78901", rating: 4.7, distance: "5.3 km", lat: 18.5362, lng: 73.8936 },
  { name: "Shree Ganesh Nursery", address: "Aundh-Ravet Road, Pimple Saudagar, Pune 411027", phone: "+91 82370 45678", rating: 4.4, distance: "6.8 km", lat: 18.5913, lng: 73.7978 },
];

export default function NurseryLocator() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    const map = L.map(mapRef.current).setView([18.5204, 73.8567], 12);
    leafletMap.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const greenIcon = L.divIcon({
      html: `<div style="background:#2E7D32;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
      className: "",
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -28],
    });

    nurseries.forEach((n) => {
      L.marker([n.lat, n.lng], { icon: greenIcon })
        .addTo(map)
        .bindPopup(`<strong>${n.name}</strong><br/>${n.address}<br/><em>${n.phone}</em>`);
    });

    return () => {
      map.remove();
      leafletMap.current = null;
    };
  }, []);

  const locateUser = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setUserLocation({ lat, lng });
        if (leafletMap.current) {
          leafletMap.current.setView([lat, lng], 13);
          L.circleMarker([lat, lng], { radius: 10, color: "#2196F3", fillColor: "#2196F3", fillOpacity: 0.5 })
            .addTo(leafletMap.current)
            .bindPopup("You are here")
            .openPopup();
        }
      },
      () => alert("Could not get your location. Please enable location access."),
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Nursery Locator</h1>
          </div>
          <p className="text-muted-foreground mb-8">Find plant nurseries and garden centers near you.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-4 shadow-card border border-border mb-8 relative"
        >
          <button
            onClick={locateUser}
            className="absolute top-6 right-6 z-[1000] bg-card border border-border shadow-md rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-semibold text-primary hover:bg-muted transition-colors"
          >
            <Locate className="w-4 h-4" /> My Location
          </button>
          <div ref={mapRef} className="w-full h-80 rounded-xl z-[1]" />
        </motion.div>

        <h2 className="text-2xl font-bold text-foreground mb-6">Nearby Nurseries</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nurseries.map((nursery, i) => (
            <NurseryCard key={nursery.name} {...nursery} index={i} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
