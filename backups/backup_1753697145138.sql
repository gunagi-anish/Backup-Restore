/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: authors
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `authors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `bio` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: books
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `author_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `published_year` year(4) DEFAULT NULL,
  `isbn` varchar(20) DEFAULT NULL,
  `summary` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE,
  CONSTRAINT `books_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE
  SET
  NULL
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: categories
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: authors
# ------------------------------------------------------------

INSERT INTO
  `authors` (`id`, `name`, `bio`, `created_at`)
VALUES
  (
    1,
    'George Orwell',
    'British author, best known for 1984 and Animal Farm.',
    '2025-07-28 10:26:25'
  );
INSERT INTO
  `authors` (`id`, `name`, `bio`, `created_at`)
VALUES
  (
    2,
    'J.K. Rowling',
    'British author, best known for the Harry Potter series.',
    '2025-07-28 10:26:25'
  );
INSERT INTO
  `authors` (`id`, `name`, `bio`, `created_at`)
VALUES
  (
    3,
    'Paulo Coelho',
    'Brazilian novelist known for The Alchemist.',
    '2025-07-28 10:26:25'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: books
# ------------------------------------------------------------

INSERT INTO
  `books` (
    `id`,
    `title`,
    `author_id`,
    `category_id`,
    `published_year`,
    `isbn`,
    `summary`,
    `created_at`
  )
VALUES
  (
    1,
    '1984',
    1,
    1,
    '1949',
    '9780451524935',
    'A dystopian novel set in a totalitarian society.',
    '2025-07-28 10:26:25'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `author_id`,
    `category_id`,
    `published_year`,
    `isbn`,
    `summary`,
    `created_at`
  )
VALUES
  (
    2,
    'Harry Potter and the Sorcerer\'s Stone',
    2,
    2,
    '1997',
    '9780590353427',
    'The first book in the Harry Potter series.',
    '2025-07-28 10:26:25'
  );
INSERT INTO
  `books` (
    `id`,
    `title`,
    `author_id`,
    `category_id`,
    `published_year`,
    `isbn`,
    `summary`,
    `created_at`
  )
VALUES
  (
    3,
    'The Alchemist',
    3,
    3,
    '1988',
    '9780061122415',
    'A journey of a shepherd boy pursuing his dreams.',
    '2025-07-28 10:26:25'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: categories
# ------------------------------------------------------------

INSERT INTO
  `categories` (`id`, `name`, `description`, `created_at`)
VALUES
  (
    1,
    'Fiction',
    'Narrative literary works based on imagination.',
    '2025-07-28 10:26:25'
  );
INSERT INTO
  `categories` (`id`, `name`, `description`, `created_at`)
VALUES
  (
    2,
    'Fantasy',
    'Genre with magical elements and imaginary worlds.',
    '2025-07-28 10:26:25'
  );
INSERT INTO
  `categories` (`id`, `name`, `description`, `created_at`)
VALUES
  (
    3,
    'Philosophy',
    'Books that explore meaning, existence, and truth.',
    '2025-07-28 10:26:25'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
