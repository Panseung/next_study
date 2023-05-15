export default async function timeHandler( req, res ) {
  return res.status(200).json( new Date() )
}