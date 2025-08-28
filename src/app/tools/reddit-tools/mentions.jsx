export default function Mentions() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="glass-card px-8 py-6 rounded-xl shadow-md mb-8 animate-fade-in text-white">
          <h1 className="text-3xl font-bold mb-1"><span className="gradient-text">Mentions</span></h1>
          <p className="text-lg text-foreground-muted mb-2">See where your brand is getting mentioned in Reddit threads.</p>
        </div>
        <div className="glass-card rounded-xl shadow-md border border-border-muted mb-8 animate-fade-in p-6 text-white">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground-muted mb-2">Brand Name</label>
              <input type="text" placeholder="Brand Name" className="w-full px-4 py-3 border border-border-muted rounded-lg focus:ring-2 focus:ring-reddit-orange focus:border-transparent text-sm" required />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn-primary px-6 py-3 rounded-lg font-medium">Find Mentions</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
