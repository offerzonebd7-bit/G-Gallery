
import React, { useState, useRef } from 'react';
import { Wallpaper, Category } from '../types';
import { generateAestheticDescription } from '../services/geminiService';

interface AdminPanelProps {
  wallpapers: Wallpaper[];
  onSave: (updated: Wallpaper[]) => void;
  onLogout: () => void;
  onBack: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ wallpapers, onSave, onLogout, onBack }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);
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
    
    let updatedList;
    if (editingId) {
      updatedList = wallpapers.map(w => w.id === editingId ? { ...w, ...formData } as Wallpaper : w);
    } else {
      const newW: Wallpaper = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: Date.now(),
      } as Wallpaper;
      updatedList = [newW, ...wallpapers];
    }
    
    onSave(updatedList);
    resetForm();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
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
    <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-24">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-24 right-10 z-[300] bg-chocolate text-offwhite px-8 py-4 rounded-2xl shadow-2xl border border-gold/30 animate-in slide-in-from-right-10 duration-500 flex items-center gap-4">
          <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-chocolate font-bold">✓</div>
          <span className="text-xs font-black uppercase tracking-widest">Masterpiece Published Successfully</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
        <div>
          <h2 className="font-serif text-5xl md:text-8xl text-chocolate dark:text-white italic tracking-tighter mb-4 leading-none">
            Atelier <span className="not-italic font-black text-gold">Manager</span>
          </h2>
          <p className="text-chocolate/40 dark:text-white/40 text-[10px] uppercase tracking-[0.5em] font-black">Graphico Global Administrative Suite</p>
        </div>
        <button 
          onClick={onBack}
          className="group flex items-center gap-4 text-chocolate dark:text-white opacity-60 hover:opacity-100 transition-opacity"
        >
          <div className="w-12 h-12 rounded-full border border-chocolate/10 dark:border-white/10 flex items-center justify-center group-hover:border-gold group-hover:bg-gold transition-all">
            <svg className="w-5 h-5 group-hover:text-offwhite" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth={2}/></svg>
          </div>
          <span className="text-[10px] uppercase font-black tracking-widest">Back to Gallery</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
        {/* Left: Creation Form */}
        <div className="xl:col-span-5">
           <div className="sticky top-32 bg-white dark:bg-chocolate p-10 md:p-14 rounded-[3.5rem] border border-chocolate/5 dark:border-white/5 shadow-[0_40px_100px_-20px_rgba(45,27,19,0.1)]">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-[11px] uppercase tracking-[0.6em] font-black text-gold">
                {editingId ? 'Modify Selection' : 'Forge New Design'}
              </h3>
              {editingId && (
                <button onClick={resetForm} className="text-[9px] uppercase font-black text-red-500/50 hover:text-red-500 tracking-widest">Cancel Edit</button>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-8">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] text-chocolate/30 dark:text-white/30 mb-4 font-black">Visual Asset</label>
                  <div className="flex flex-col gap-6">
                    {formData.imageUrl && (
                      <div className="relative group">
                        <img src={formData.imageUrl} className="w-full h-72 object-cover rounded-[2.5rem] border-2 border-chocolate/5 dark:border-white/5 shadow-xl" alt="Preview" />
                        <div className="absolute inset-0 bg-chocolate/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] flex items-center justify-center">
                           <button type="button" onClick={() => setFormData({...formData, imageUrl: ''})} className="bg-white/10 backdrop-blur-md p-4 rounded-full text-white border border-white/20 hover:bg-red-500 transition-colors">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2}/></svg>
                           </button>
                        </div>
                      </div>
                    )}
                    {!formData.imageUrl && (
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full aspect-video bg-chocolate/5 dark:bg-white/5 border-2 border-dashed border-chocolate/10 dark:border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-chocolate/30 dark:text-white/30 hover:border-gold hover:text-gold transition-all"
                      >
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth={1.5}/></svg>
                        <span className="text-[10px] uppercase font-black tracking-widest">Select Image File</span>
                      </button>
                    )}
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden"
                    />
                    <div className="relative">
                      <input 
                        type="url" 
                        placeholder="Or embed Image URL..."
                        value={formData.imageUrl?.startsWith('data:') ? '' : formData.imageUrl}
                        onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                        className="w-full bg-transparent border-b border-chocolate/10 dark:border-white/10 focus:border-gold py-4 focus:outline-none text-[11px] font-serif italic"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] text-chocolate/30 dark:text-white/30 mb-2 font-black">Title of Work</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-chocolate/10 dark:border-white/10 focus:border-gold py-4 focus:outline-none text-2xl font-serif italic text-chocolate dark:text-white"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-12">
                   <div>
                    <label className="block text-[9px] uppercase tracking-[0.3em] text-chocolate/30 dark:text-white/30 mb-2 font-black">Collection</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value as Category})}
                      className="w-full bg-transparent border-b border-chocolate/10 dark:border-white/10 focus:border-gold py-4 focus:outline-none text-[11px] uppercase tracking-widest font-black text-chocolate dark:text-white cursor-pointer"
                    >
                      {Object.values(Category).map(cat => <option key={cat} value={cat} className="text-black bg-offwhite">{cat}</option>)}
                    </select>
                  </div>
                   <div>
                    <label className="block text-[9px] uppercase tracking-[0.3em] text-chocolate/30 dark:text-white/30 mb-2 font-black">Appraisal ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                      className="w-full bg-transparent border-b border-chocolate/10 dark:border-white/10 focus:border-gold py-4 focus:outline-none text-2xl font-serif text-chocolate dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-8 pt-8 border-t border-chocolate/5 dark:border-white/5">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <label className="block text-[9px] uppercase tracking-[0.3em] text-chocolate/30 dark:text-white/30 font-black">AI Curation</label>
                    <button 
                      type="button" 
                      onClick={handleGenerateDescription}
                      disabled={isGenerating}
                      className="text-[10px] text-gold font-black uppercase tracking-widest hover:text-chocolate dark:hover:text-white transition-all bg-gold/5 px-4 py-2 rounded-full border border-gold/20"
                    >
                      {isGenerating ? 'Refining...' : '✨ Generate with Gemini'}
                    </button>
                  </div>
                  <textarea 
                    rows={4}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-chocolate/5 dark:bg-white/5 rounded-3xl p-8 focus:ring-1 ring-gold/30 focus:outline-none text-[11px] italic leading-relaxed text-chocolate dark:text-white/80"
                  />
                </div>

                <div className="flex gap-16">
                  <label className="flex items-center space-x-6 cursor-pointer group">
                    <div className="relative">
                       <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={formData.isActive}
                        onChange={e => setFormData({...formData, isActive: e.target.checked})}
                      />
                      <div className="w-12 h-6 bg-chocolate/10 rounded-full peer-checked:bg-gold transition-colors" />
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-chocolate/60 dark:text-white/60 font-black group-hover:text-gold">Publicly Active</span>
                  </label>
                  <label className="flex items-center space-x-6 cursor-pointer group">
                    <div className="relative">
                       <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={formData.isPremium}
                        onChange={e => setFormData({...formData, isPremium: e.target.checked})}
                      />
                      <div className="w-12 h-6 bg-chocolate/10 rounded-full peer-checked:bg-gold transition-colors" />
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-chocolate/60 dark:text-white/60 font-black group-hover:text-gold">Premium Status</span>
                  </label>
                </div>
              </div>

              <div className="pt-10">
                <button 
                  type="submit" 
                  className="w-full bg-chocolate dark:bg-offwhite text-offwhite dark:text-chocolate py-8 rounded-[2.5rem] text-[12px] uppercase tracking-[0.6em] font-black hover:bg-gold dark:hover:bg-gold hover:text-white transition-all shadow-[0_30px_60px_-15px_rgba(45,27,19,0.3)] active:scale-95"
                >
                  {editingId ? 'Confirm Update' : 'Finalize & Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Asset List */}
        <div className="xl:col-span-7 space-y-12">
          <div className="flex justify-between items-center mb-10 pb-6 border-b border-chocolate/5 dark:border-white/5">
            <h3 className="text-[12px] uppercase tracking-[0.5em] font-black text-chocolate dark:text-white">Active Catalog <span className="text-gold">({wallpapers.length})</span></h3>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[8px] uppercase font-black text-chocolate/30">Live Sync Engaged</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10">
            {wallpapers.map(w => (
              <div key={w.id} className="bg-white dark:bg-chocolate p-10 rounded-[3rem] border border-chocolate/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(197,160,89,0.1)] transition-all group overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-gold/10 group-hover:bg-gold transition-colors" />
                
                <div className="flex items-center gap-10 w-full md:w-auto">
                  <div className="relative shrink-0">
                    <img src={w.imageUrl} className="w-24 h-32 object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-700" />
                    {!w.isActive && (
                      <div className="absolute inset-0 bg-chocolate/60 backdrop-blur-[2px] rounded-3xl flex items-center justify-center">
                         <span className="text-[8px] uppercase font-black text-white tracking-widest -rotate-45">Hidden</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-3xl italic font-bold text-chocolate dark:text-white tracking-tight">{w.name}</h4>
                    <div className="flex flex-wrap gap-6 items-center">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-chocolate/30 dark:text-white/30 font-black">{w.category}</span>
                      <div className="flex items-center gap-2">
                         <div className={`w-1.5 h-1.5 rounded-full ${w.isPremium ? 'bg-gold' : 'bg-green-500'}`} />
                         <span className={`text-[9px] uppercase tracking-widest font-black ${w.isPremium ? 'text-gold' : 'text-green-500/60'}`}>{w.isPremium ? 'Premium' : 'Free'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 w-full md:w-auto justify-end border-t md:border-t-0 md:border-l border-chocolate/5 dark:border-white/5 pt-8 md:pt-0 md:pl-10">
                  <button 
                    onClick={() => handleToggleOffer(w.id)} 
                    title="Limited Offer"
                    className={`p-4 rounded-full border transition-all ${w.limitedFreeUntil ? 'border-gold text-gold bg-gold/5 shadow-lg shadow-gold/20' : 'border-chocolate/5 text-chocolate/20 dark:border-white/5 hover:border-gold hover:text-gold'}`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={1.5}/></svg>
                  </button>
                  <button 
                    onClick={() => handleEdit(w)} 
                    title="Edit"
                    className="p-4 rounded-full border border-chocolate/5 dark:border-white/5 text-chocolate/20 dark:text-white/20 hover:text-gold hover:border-gold transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeWidth={1.5}/></svg>
                  </button>
                  <button 
                    onClick={() => handleDelete(w.id)} 
                    title="Delete"
                    className="p-4 rounded-full border border-chocolate/5 dark:border-white/5 text-red-500/20 hover:text-red-500 hover:border-red-500 hover:bg-red-500/5 transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={1.5}/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Persistent Bottom Actions */}
      <div className="mt-32 pt-20 border-t border-chocolate/5 dark:border-white/5 flex flex-col items-center gap-12">
        <div className="flex gap-8">
           <button 
            onClick={onBack}
            className="px-12 py-5 rounded-full bg-chocolate/5 dark:bg-white/5 text-chocolate dark:text-white text-[10px] uppercase font-black tracking-[0.4em] hover:bg-gold hover:text-offwhite transition-all shadow-sm"
          >
            Back to Dashboard
          </button>
          <button 
            onClick={onLogout}
            className="px-12 py-5 rounded-full bg-red-500 text-offwhite text-[10px] uppercase font-black tracking-[0.4em] hover:bg-chocolate transition-all shadow-xl shadow-red-500/20"
          >
            Terminal Session
          </button>
        </div>
        
        <div className="text-center opacity-30 group cursor-default">
           <p className="font-serif text-3xl italic font-black text-chocolate dark:text-white group-hover:text-gold transition-colors">Graphico Global</p>
           <p className="text-[8px] uppercase tracking-[0.8em] mt-2 font-black">Authorized Personnel Only</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
