import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { ExternalLink, Edit, MoreHorizontal, MessageSquare, TrendingUp } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function RedditPostsTable({ posts }) {
  const getStatusBadge = (status) => {
    const statusColors = {
      approved: 'bg-approved text-approved-foreground',
      pending: 'bg-pending text-pending-foreground',
      rejected: 'bg-rejected text-rejected-foreground',
      live: 'bg-live text-live-foreground'
    };

    return (
      <Badge className={`${statusColors[status]} capitalize`}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="border-border">
            <TableHead className="text-muted-foreground font-medium">Title</TableHead>
            <TableHead className="text-muted-foreground font-medium">Subreddit</TableHead>
            <TableHead className="text-muted-foreground font-medium">Category</TableHead>
            <TableHead className="text-muted-foreground font-medium">Status</TableHead>
            <TableHead className="text-muted-foreground font-medium">Keywords</TableHead>
            <TableHead className="text-muted-foreground font-medium">Stats</TableHead>
            <TableHead className="text-muted-foreground font-medium">Date</TableHead>
            <TableHead className="text-muted-foreground font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id} className="border-border hover:bg-muted/50">
              <TableCell className="font-medium max-w-xs">
                <div>
                  <p className="font-semibold text-foreground truncate">{post.title}</p>
                  {post.description && (
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {post.description}
                    </p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm bg-secondary text-secondary-foreground px-2 py-1 rounded">
                  r/{post.subreddit}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">{post.category}</span>
              </TableCell>
              <TableCell>{getStatusBadge(post.status)}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1 max-w-xs">
                  {post.keywords.slice(0, 3).map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                  {post.keywords.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{post.keywords.length - 3}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {post.upvotes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {post.comments}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {post.date}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View on Reddit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      Edit Post
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}