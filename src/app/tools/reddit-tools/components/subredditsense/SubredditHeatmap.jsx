
// --- Utility: build dynamic recency buckets ---------------------------------
function buildBuckets(maxAgeDays){
	// Age 0 = today/newest. We'll order buckets newest -> oldest.
	if (maxAgeDays <= 14){
		// Daily buckets (limit to maxAgeDays+1 up to 14)
		const days = Math.min(14, Math.floor(maxAgeDays)+1);
		return Array.from({length: days}, (_,i)=>({ key:`d_${i}`, from:i, to:i, label: i===0? 'Today' : `${i}d ago` }));
	}
	if (maxAgeDays <= 60){
		// Rolling 7d buckets up to needed
		const bands = [ [0,7,'Last 7d'], [8,14,'8–14d'], [15,30,'15–30d'], [31,60,'31–60d'] ];
		return bands.filter(b=> b[0] <= maxAgeDays).map(([from,to,label])=>({key:`${from}_${to}`, from, to, label}));
	}
	if (maxAgeDays <= 180){
		const bands = [ [0,7,'Last 7d'], [8,30,'8–30d'], [31,60,'31–60d'], [61,90,'61–90d'], [91,180,'91–180d'] ];
		return bands.filter(b=> b[0] <= maxAgeDays).map(([from,to,label])=>({key:`${from}_${to}`, from, to, label}));
	}
	const bands = [ [0,7,'Last 7d'], [8,30,'8–30d'], [31,90,'31–90d'], [91,180,'91–180d'], [181,365,'181–365d'], [366,9999,'>365d'] ];
	return bands.filter(b=> b[0] <= maxAgeDays).map(([from,to,label])=>({key:`${from}_${to}`, from, to, label}));
}

function normalizeData(posts=[], comments=[]){
	const all = [...posts, ...comments].filter(i=> i && i.subreddit);
	if (!all.length) return { buckets: [], rows: [], maxValue: 0 };
	// age days from post_age_hours; default 0 if missing
	all.forEach(i=> { i.__ageDays = i.post_age_hours != null ? Math.floor(i.post_age_hours / 24) : 0; });
	const maxAge = Math.max(...all.map(i=> i.__ageDays));
	let buckets = buildBuckets(maxAge);
	// Aggregate
	const subs = Array.from(new Set(all.map(i=> i.subreddit)));
	const rows = subs.map(sub => {
		const items = all.filter(i=> i.subreddit === sub);
		const bucketMap = new Map();
		buckets.forEach(b=> bucketMap.set(b.key, { value:0, engagement:0 }));
		buckets.forEach(b=> {
			const bItems = items.filter(it=> it.__ageDays >= b.from && it.__ageDays <= b.to);
			if (bItems.length){
				const totalEng = bItems.reduce((acc,it)=> acc + (it.upvotes||0) + (it.total_comments||0), 0);
				bucketMap.set(b.key, { value: bItems.length, engagement: Math.round(totalEng / bItems.length) });
			}
		});
		const totalMentions = items.length;
		return { subreddit: sub, totalMentions, buckets: bucketMap };
	});
	// Sort subreddits by totalMentions desc
	rows.sort((a,b)=> b.totalMentions - a.totalMentions);
	// Compute column totals & prune empty columns (except the most recent bucket 0)
	const colTotals = buckets.map(b=> rows.reduce((sum,r)=> sum + (r.buckets.get(b.key)?.value||0),0));
	const pruned = buckets.filter((b,idx)=> idx===0 || colTotals[idx] > 0);
	buckets = pruned;
	const maxValue = Math.max(1, ...rows.flatMap(r=> buckets.map(b=> r.buckets.get(b.key)?.value||0)));
	return { buckets, rows, maxValue };
}

const palette = [ '#FFF1E9', '#FFD1B8', '#FF8B60', '#FF5700', '#FF4500' ];
function colorFor(value, maxValue){
	if (value <= 0) return 'transparent';
	const ratio = Math.sqrt(value / maxValue); // sqrt normalization
	const idx = Math.min(palette.length - 1, Math.floor(ratio * (palette.length - 1 + 1e-6)));
	return palette[idx];
}

import { useMemo, useState } from 'react';

const SubredditHeatmap = ({ data }) => {
	const posts = (data && Array.isArray(data.posts)) ? data.posts : [];
	const comments = (data && Array.isArray(data.comments)) ? data.comments : [];
	const { buckets, rows, maxValue } = useMemo(()=> normalizeData(posts, comments), [posts, comments]);
	const [showAll, setShowAll] = useState(false);
	const visibleRows = showAll ? rows : rows.slice(0,12);

	if (!rows.length){
		return (
			<div className="chart-container animate-slide-up">
				<h2 className="text-xl font-semibold mb-2">Subreddit Activity Heatmap</h2>
				<p className="text-sm text-muted-foreground mb-6">No activity yet to visualize.</p>
				<p className="text-xs text-muted-foreground">Once mentions are ingested you will see intensity by recency bands here.</p>
			</div>
		);
	}

	return (
		<div className="chart-container animate-slide-up">
			<div className="flex items-center justify-between mb-4">
				<div>
					<h2 className="text-xl font-semibold text-foreground mb-1">Subreddit Activity Heatmap</h2>
					<p className="text-foreground-muted text-sm">Mention volume across top communities (newest left)</p>
				</div>
				<div className="flex items-center space-x-2 text-xs text-foreground-muted">
					<span>Low</span>
					<div className="flex space-x-1">
						{palette.map(c => (<div key={c} className="w-3 h-3 rounded-sm border border-border-muted" style={{backgroundColor:c}} />))}
					</div>
					<span>High</span>
				</div>
			</div>
			<div className="overflow-x-auto">
				<div className="min-w-full">
					<div className="flex mb-2">
						<div className="w-40" />
						{buckets.map(b=> (
							<div key={b.key} className="flex-1 text-center text-[11px] text-muted-foreground font-medium px-1">
								{b.label}
							</div>
						))}
					</div>
					{visibleRows.map(r=> (
						<div key={r.subreddit} className="flex items-center mb-1">
							<div className="w-40 text-sm text-muted-foreground font-medium truncate pr-3" title={r.subreddit}>{r.subreddit}</div>
							<div className="flex flex-1 space-x-1">
								{buckets.map(b=> {
									const cell = r.buckets.get(b.key) || { value:0, engagement:0 };
									const bg = colorFor(cell.value, maxValue);
									const darkText = ['#FFF1E9','#FFD1B8'].includes(bg);
									return (
										<div
											key={b.key}
											aria-label={`${r.subreddit} ${b.label}: ${cell.value} mentions, avg engagement ${cell.engagement}`}
											title={`${r.subreddit} – ${b.label}: ${cell.value} mentions, avg engagement ${cell.engagement}`}
											className={`flex-1 h-7 rounded border border-border-muted relative flex items-center justify-center text-[10px] font-semibold transition-all duration-150 ${cell.value? 'cursor-pointer hover:scale-105 hover:shadow-glow' : ''}`}
											style={{ backgroundColor: bg, color: cell.value? (darkText ? '#222' : '#FFF') : 'transparent' }}
										>
											{cell.value>0 ? cell.value : ''}
										</div>
									);
								})}
							</div>
						</div>
					))}
				</div>
			</div>
			{rows.length > 12 && (
				<button
					onClick={()=> setShowAll(s=> !s)}
					className="mt-4 text-xs text-primary hover:underline"
				>
					{showAll ? 'Show Top 12' : `Show All (${rows.length})`}
				</button>
			)}
		</div>
	);
};

export default SubredditHeatmap;
