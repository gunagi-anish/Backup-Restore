USE book_management;

-- Insert sample authors
INSERT INTO authors (name, bio) VALUES
('George Orwell', 'British author, best known for 1984 and Animal Farm.'),
('J.K. Rowling', 'British author, best known for the Harry Potter series.'),
('Paulo Coelho', 'Brazilian novelist known for The Alchemist.');

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Fiction', 'Narrative literary works based on imagination.'),
('Fantasy', 'Genre with magical elements and imaginary worlds.'),
('Philosophy', 'Books that explore meaning, existence, and truth.');

-- Insert sample books
INSERT INTO books (title, author_id, category_id, published_year, isbn, summary) VALUES
('1984', 1, 1, 1949, '9780451524935', 'A dystopian novel set in a totalitarian society.'),
('Harry Potter and the Sorcerer''s Stone', 2, 2, 1997, '9780590353427', 'The first book in the Harry Potter series.'),
('The Alchemist', 3, 3, 1988, '9780061122415', 'A journey of a shepherd boy pursuing his dreams.');
