import gql from 'graphql-tag';

const recipeQuery = gql`
    query recipe($slug: String) {
        recipe(slug: $slug) {
            cook_time
            ingredients {
                component
                ingredients
            }
            introduction
            media {
                height
                uri
                width
            }
            method {
                component
                steps
            }
            name
            notes
            prep_time
            serves
            short_description
            slug
            tags
            total_time
        }
    }
`;

export default recipeQuery;
