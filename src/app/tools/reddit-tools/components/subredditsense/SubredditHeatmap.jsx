



const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];


function aggregateHeatmapData(posts = [], comments = []) {
	const all = [...posts, ...comments];
	// Dynamically get all unique subreddits from data
	const subreddits = Array.from(new Set(all.map(i => i.subreddit).filter(Boolean)));
	function getWeek(item) {
		if (!item.post_age_hours) return 'W1';
		const weekNum = Math.max(1, Math.min(8, 8 - Math.floor(item.post_age_hours / 168)));
		return 'W' + weekNum;
	}
	return subreddits.map(subreddit => ({
		subreddit,
		data: weeks.map(week => {
			const items = all.filter(i => i.subreddit === subreddit && getWeek(i) === week);
			return {
				week,
				value: items.length,
				engagement: items.length ? Math.round(items.reduce((acc, i) => acc + (i.upvotes || 0) + (i.total_comments || 0), 0) / items.length) : 0
			};
		})
	}));
}

const SubredditHeatmap = ({ data }) => {
	let heatmapData;
		if (data && Array.isArray(data.posts) && data.posts.length > 0) {
			heatmapData = aggregateHeatmapData(data.posts, data.comments || []);
		} else {
			// fallback to mock
			const mockSubreddits = [
				'r/programming', 'r/webdev', 'r/javascript', 'r/reactjs', 'r/node',
				'r/docker', 'r/kubernetes', 'r/devops', 'r/startups', 'r/entrepreneur',
				'r/SaaS', 'r/marketing', 'r/analytics', 'r/datascience', 'r/MachineLearning'
			];
			heatmapData = mockSubreddits.map(subreddit => ({
				subreddit,
				data: weeks.map(week => ({
					week,
					value: Math.floor(Math.random() * 50) + 1,
					engagement: Math.floor(Math.random() * 100) + 10
				}))
			}));
		}

	// Dynamic scaling with Reddit orange palette (light -> intense)
	const allValues = (heatmapData||[]).flatMap(r=> r.data.map(d=> d.value));
	const observedMax = allValues.length ? Math.max(...allValues) : 0;
	const threshold = observedMax > 1000 ? 1000 : (observedMax > 100 ? 100 : (observedMax || 100));
	const palette = [
		'#FFF1E9', // very light
		'#FFD1B8', // light
		'#FF8B60', // upvote color
		'#FF5700', // reddit orange
		'#FF4500'  // orangered (highest intensity)
	];
	const getIntensityColor = (value) => {
		if (value <= 0) return palette[0];
		const ratio = Math.min(value / threshold, 1);
		const idx = Math.min(palette.length - 1, Math.floor(ratio * (palette.length - 1 + 0.00001)));
		return palette[idx];
	};

		return (
			<div className="chart-container animate-slide-up">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h2 className="text-xl font-semibold text-foreground mb-1">
						Subreddit Activity Heatmap
					</h2>
					<p className="text-foreground-muted text-sm">
						Mention volume across top communities over time
					</p>
				</div>
				<div className="flex items-center space-x-2 text-xs text-foreground-muted">
					<span>Low</span>
					<div className="flex space-x-1">
						{palette.map(c => (
							<div key={c} className="w-3 h-3 rounded-sm border border-border-muted" style={{backgroundColor:c}} />
						))}
					</div>
					<span>High</span>
					<span className="ml-2 text-[10px] opacity-70">Full at ≥ {threshold}</span>
				</div>
			</div>

			<div className="overflow-x-auto">
				<div className="min-w-full">
					<div className="flex mb-2">
						<div className="w-32"></div>
						{weeks.map(week => (
							<div key={week} className="flex-1 text-center text-sm text-foreground-muted font-medium">
								{week}
							</div>
						))}
					</div>

					{heatmapData.map(({ subreddit, data }) => (
						<div key={subreddit} className="flex items-center mb-1">
							<div className="w-32 text-sm text-foreground-muted font-medium truncate pr-3">
								{subreddit}
							</div>
							<div className="flex flex-1 space-x-1">
								{data.map(({ week, value, engagement }) => {
									const bg = getIntensityColor(value);
									// Decide text color for contrast
									const darkText = ['#FFF1E9','#FFD1B8'].includes(bg);
									return (
										<div
											key={week}
											className="flex-1 h-8 rounded border border-border-muted cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-glow flex items-center justify-center text-[11px] font-semibold"
											style={{ backgroundColor: bg, color: darkText ? '#222' : '#FFF' }}
											title={`${subreddit} - ${week}: ${value} mentions, ${engagement}% engagement`}
										>
											{value > 0 ? value : ''}
										</div>
									);
								})}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SubredditHeatmap;
