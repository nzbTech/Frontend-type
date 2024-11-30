function buildQueryParams(filters) {
  const queryParams = new URLSearchParams(); // Utilisation de URLSearchParams pour construire l'URL

  for (const [field, filter] of Object.entries(filters)) {
    if (typeof filter === 'object' && 'operator' in filter) {
      queryParams.append(`${field}[operator]`, filter.operator);
      
      // Pour les opérateurs avec une seule valeur
      if ('value' in filter) {
        queryParams.append(`${field}[value]`, filter.value);
      }

      // Pour les opérateurs avec plusieurs valeurs (in, between, etc.)
      if ('values' in filter) {
        filter.values.forEach(value => {
          queryParams.append(`${field}[values][]`, value);
        });
      }
    } else {
      // Pour les filtres NULL et NOT NULL ou les comparaisons directes
      queryParams.append(field, filter);
    }
  }

  return queryParams.toString(); // Retourner la chaîne de paramètres pour l'URL
}

// Exemple d'utilisation avec les filtres
const filters = {
  age: { operator: '>', value: 25 },
  salary: { operator: 'between', values: [3000, 5000] },
  status: { operator: 'in', values: ['active', 'pending'] },
  name: { operator: 'like', value: 'John' },
  deleted_at: 'isNull',
  city: 'New York'
};

const queryParams = buildQueryParams(filters);
const url = `https://votre-backend-url/api/resource?${queryParams}`;

// Ensuite, utilisez l'URL pour effectuer la requête GET
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erreur:', error));






// exemple objet filters
// const filters = {
//     age: { operator: '>', value: 25 },                           // Âge supérieur à 25
//     salary: { operator: 'between', values: [3000, 5000] },       // Salaire entre 3000 et 5000
//     status: { operator: 'in', values: ['active', 'pending'] },   // Status soit "active" soit "pending"
//     name: { operator: 'like', value: 'John' },                   // Nom contenant "John"
//     deleted_at: 'isNull',                                        // deleted_at est NULL
//     city: 'New York'                                             // Ville est égale à "New York"
// }