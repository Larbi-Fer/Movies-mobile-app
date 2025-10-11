import { Client, ID, Query, TablesDB } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

// const database = new Databases(client)
const database = new TablesDB(client)

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listRows({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID,
      queries: [Query.equal('searchTerm', query)]
    })
    console.log(query);
    
    if (result.rows.length > 0) {
      const existingMovie = result.rows[0];

      await database.updateRow({
        databaseId: DATABASE_ID,
        tableId: COLLECTION_ID,
        rowId: existingMovie.$id,
        data: {
          count: existingMovie.count + 1,
        }
      })
    } else {
      await database.createRow({
        databaseId: DATABASE_ID,
        tableId: COLLECTION_ID,
        rowId: ID.unique(),
        data: {
          searchTerm: query,
          movie_id: movie.id,
          count: 1,
          title: movie.title, 
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }
      })
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
  
}