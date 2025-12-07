import { NextResponse } from 'next/server';

// GET trending news
export async function GET() {
  try {
    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    
    if (!NEWS_API_KEY) {
      return NextResponse.json(
        { error: 'News API key not configured' },
        { status: 500 }
      );
    }

    // Fetch top headlines from News API
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=${NEWS_API_KEY}`,
      {
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const data = await response.json();

    // Format the news for our app
    const formattedNews = data.articles.map((article, index) => ({
      id: index,
      title: article.title,
      description: article.description,
      source: article.source.name,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      category: article.source.name,
    }));

    return NextResponse.json(
      { 
        success: true,
        news: formattedNews,
        totalResults: data.totalResults 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch news',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
