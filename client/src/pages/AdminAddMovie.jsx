import React, { useState } from "react";
import { createMovie } from "../api/movieApi";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Loader2, PlusCircle } from "lucide-react";

const AdminAddMovie = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const moviePayload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        duration: formData.duration.trim(),
        price: Number(formData.price),
        // 🔥 No need to send showtimes, backend handles it
      };

      await createMovie(moviePayload, authUser.token);
      navigate("/movies");
    } catch (err) {
      console.error(err);
      setError("Failed to add movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-20 max-w-lg">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <PlusCircle className="w-6 h-6" />
        Add New Movie
      </h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          className="input input-bordered w-full"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g. 2h 30min)"
          className="input input-bordered w-full"
          value={formData.duration}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Ticket Price"
          className="input input-bordered w-full"
          value={formData.price}
          onChange={handleChange}
          min="0"
          required
        />

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
              Adding...
            </>
          ) : (
            "Add Movie"
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminAddMovie;
