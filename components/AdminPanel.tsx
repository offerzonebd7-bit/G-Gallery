
import React, { useState, useRef } from 'react';
import { Wallpaper, Category } from '../types';
import { generateAestheticDescription } from '../services/geminiService';

interface AdminPanelProps {
  wallpapers: Wallpaper[];
  onSave: (updated: Wallpaper[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ wallpapers, onSave }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Partial<Wallpaper>>({
    name: '',
    category: Category.MINIMALIST,
    price: 0,
    imageUrl: '',
    description: '',
    isActive: true,
    isPremium: false,
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: Category.MINIMALIST,
      price: 0,
      imageUrl: '',
      description: '',
      isActive: true,
      isPremium: false,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (w: Wallpaper) => {
    setEditingId(w.id);
    setFormData(w);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Permanently delete this design?')) {
      onSave(wallpapers.filter(w => w.id !== id));
    }
  };

  const handleGenerateDescription = async () => {
    if (!formData.name) return alert('Enter a name first');
    setIsGenerating(true);
    const desc = await generateAestheticDescription(formData.name!, formData.category!);
    setFormData(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) return alert('Please select or provide an image URL');
    
    if (editingId) {
      onSave(wallpapers.map(w => w.id === editingId ? { ...w, ...formData } as Wallpaper : w));
    } else {
      const newW: Wallpaper = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: Date.now(),
      } as Wallpaper;
      onSave([newW, ...wallpapers]);
    }
    resetForm();
  };

  const handleToggleOffer = (id: string) => {
    onSave(wallpapers.map(w => {
      if (w.id === id) {
        return {
          ...w,
          limitedFreeUntil: w.limitedFreeUntil ? undefined : Date.now() + (6 * 60 * 60 * 1000)
        };
      }
      return w;
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-neutral-100 pb-10">
        <div>
          <h2 className="font-serif text-5xl italic tracking-tight mb-2">Owner's Dashboard</h2>
          <p className="text-neutral-400 text-xs uppercase tracking-[0.3em] font-light">Direct Upload & Management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
        <div className="xl:col-span-5">
           <div className="sticky top-32 bg-white p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-neutral-50">
            <h3 className="text-[11px] uppercase tracking-[0.4em] font-bold mb-10 text-neutral-900 border-l-2 border-black pl-4">
              {editingId ? 'Edit Design' : 'Upload New Design'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-2 font-bold">Design Image</label>
                  <div className="flex flex-col gap-4">
                    {formData.imageUrl && (
                      <img src={formData.imageUrl} className="w-24 h-32 object-cover border border-neutral-100" alt="Preview" />
                    )}
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs border border-dashed border-neutral-300 py-4 text-neutral-400 hover:text-black hover:border-black transition-all"
                    >
                      {formData.imageUrl ? 'Change Image' : 'Pick from Gallery'}
                    </button>
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden"
                    />
                    <div className="text-center text-[9px] text-neutral-300 uppercase tracking-widest">or paste URL below</div>
                    <input 
                      type="url" 
                      placeholder="https://example.com/image.jpg"
                      value={formData.imageUrl?.startsWith('data:') ? '' : formData.imageUrl}
                      onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                      className="w-full border-b border-neutral-100 focus:border-black py-2 focus:outline-none text-xs font-light"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label className="block text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-2 font-bold">Design Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full border-b border-neutral-100 focus:border-black py-2 focus:outline-none text-sm font-light"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                   <div>
                    <label className="block text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-2 font-bold">Category</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value as Category})}
                      className="w-full border-b border-neutral-100 focus:border-black py-2 focus:outline-none text-xs bg-transparent uppercase tracking-widest"
                    >
                      {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                   <div>
                    <label className="block text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-2 font-bold">Price ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                      className="w-full border-b border-neutral-100 focus:border-black py-2 focus:outline-none text-sm font-light"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-4 border-t border-neutral-50">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-bold">Description</label>
                    <button 
                      type="button" 
                      onClick={handleGenerateDescription}
                      disabled={isGenerating}
                      className="text-[9px] text-[#c5a059] font-bold uppercase tracking-[0.1em] hover:text-black transition-colors"
                    >
                      {isGenerating ? 'Curating...' : '✨ Use Gemini AI'}
                    </button>
                  </div>
                  <textarea 
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full border border-neutral-100 p-4 focus:border-black focus:outline-none text-xs italic"
                  />
                </div>

                <div className="flex gap-10">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 accent-black"
                      checked={formData.isActive}
                      onChange={e => setFormData({...formData, isActive: e.target.checked})}
                    />
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400">Show to users</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 accent-black"
                      checked={formData.isPremium}
                      onChange={e => setFormData({...formData, isPremium: e.target.checked})}
                    />
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400">Premium/Paid</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-6">
                <button 
                  type="submit" 
                  className="w-full bg-black text-white py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-neutral-800 transition-all shadow-xl"
                >
                  {editingId ? 'Update Design' : 'Publish Design'}
                </button>
                {editingId && (
                  <button 
                    type="button" 
                    onClick={resetForm}
                    className="w-full py-4 text-neutral-300 hover:text-black text-[9px] uppercase tracking-[0.4em]"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="xl:col-span-7 space-y-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[11px] uppercase tracking-[0.4em] font-bold text-neutral-900">Current Collection</h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {wallpapers.map(w => (
              <div key={w.id} className="bg-white border border-neutral-100 p-6 flex items-center justify-between shadow-sm hover:border-black transition-all">
                <div className="flex items-center gap-6">
                  <img src={w.imageUrl} className="w-16 h-20 object-cover" />
                  <div>
                    <h4 className="font-serif text-xl italic">{w.name}</h4>
                    <p className="text-[9px] text-neutral-400 uppercase tracking-widest">{w.category} • {w.isPremium ? 'Premium' : 'Free'}</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button onClick={() => handleToggleOffer(w.id)} className={`p-2 ${w.limitedFreeUntil ? 'text-amber-500' : 'text-neutral-200'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </button>
                  <button onClick={() => handleEdit(w)} className="text-neutral-200 hover:text-black transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                  <button onClick={() => handleDelete(w.id)} className="text-neutral-100 hover:text-red-400 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
