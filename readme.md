## join

```sql 
SELECT pirmaLentele.stlpelis, antraLentele.stuplepis
FROM pirmaLentele
LEFT JOIN antraLentele
ON pirmaLentele.laukasKurisSiejasi = antraLentele.laukasKurisSiejasi
```

### pvz 

```sql 
SELECT posts.p_id, posts.title, posts.body, categories.name 
FROM posts
LEFT JOIN categories
ON posts.category_id = categories.c_id
```