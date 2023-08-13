import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: Request) {
  const { base64Image } = await request.json();

  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: 'next13-grafbase'
    };

    const result = await cloudinary.uploader.upload(base64Image, options);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
