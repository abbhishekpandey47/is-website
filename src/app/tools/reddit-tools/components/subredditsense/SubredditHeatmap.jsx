
const SubredditHeatmap = ({ data }) => {
	// If no data or empty, show empty table
	const hasData = data && Array.isArray(data.posts) && data.posts.length > 0;
	return (
		<div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
			<h2 className="text-xl font-semibold text-foreground mb-4">Subreddit Heatmap</h2>
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="border-b border-border">
							<th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">Subreddit</th>
							<th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">Mentions</th>
							<th className="text-left py-3 px-2 text-sm font-medium text-foreground-muted">Engagement</th>
						</tr>
					</thead>
					<tbody>
						{hasData ? (
							data.posts.map((post, idx) => (
								<tr key={idx} className="border-b border-border-muted">
									<td className="py-2 px-2">{post.subreddit}</td>
									<td className="py-2 px-2">{post.mentions || 0}</td>
									<td className="py-2 px-2">{post.engagement || 0}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={3} className="py-8 text-center text-foreground-muted">No data available.</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default SubredditHeatmap;
