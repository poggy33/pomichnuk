import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/postModel";
import { connect } from "@/dbConfig/dbConfig";
import Rate from "@/models/rateModel"

connect();

// export async function POST(request: NextRequest) {
// try {
//     const reqBody = await request.json();
//     const {_id} = reqBody;   
//         const updatedPosts = await Post.findOneAndDelete({_id: _id,})
//         await Rate.deleteMany({whatIsCheckedId: _id})
//         return NextResponse.json({
//         message: "Post deleted",
//         data: updatedPosts,
//     })
    
//     }
//  catch (error: any) {
//         return NextResponse.json({error: error.message},
//         {status:400})
//     }
// };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      try {
        const reqBody = req.body;
        const { _id } = reqBody;
  
        const deletedPost = await Post.findOneAndDelete({ _id });
        if (!deletedPost) {
          return res.status(404).json({ error: 'Post not found' });
        }
  
        await Rate.deleteMany({ whatIsCheckedId: _id });
  
        return res.status(200).json({
          message: 'Post deleted',
          data: deletedPost,
        });
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }
    } else {
      // Return a 405 Method Not Allowed if the method is not POST
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }

