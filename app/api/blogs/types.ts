export type Blog ={
    id : number ;
    title : string;
    excerpt : string;
    content: string;
    image: string;
    author : string ;
    date : string ;
    readTime : string ;
    category : string ;
    status: 'published' | 'draft';
    views: number;
    likes: number;
    createdAt: string;
    updatedAt: string;
}

export default Blog ;