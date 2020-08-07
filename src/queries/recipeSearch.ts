import gql from 'graphql-tag';

const searchQuery = gql`
    query recipe_search($search: String, $page: Int, $page_size: Int) {
        recipe_search(q: $search, page: $page, page_size: $page_size) {
            total_hits
            hits {
                score
                recipe {
                    media {
                        height
                        uri
                        width
                    }
                    name
                    serves
                    short_description
                    slug
                    total_time
                }
            }
        }
    }
`;

export default searchQuery;
