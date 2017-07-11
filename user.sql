-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generato il: Set 20, 2014 alle 17:48
-- Versione del server: 5.5.16
-- Versione PHP: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `user`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `punteggio`
--

CREATE TABLE IF NOT EXISTS `punteggio` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Punteggio` int(11) NOT NULL,
  `User` varchar(15) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=158 ;

--
-- Dump dei dati per la tabella `punteggio`
--

INSERT INTO `punteggio` (`ID`, `Punteggio`, `User`) VALUES
(93, -150, 'francesco'),
(94, -150, 'francesco'),
(95, -150, 'francesco'),
(96, -50, 'francesco'),
(97, -150, 'francesco'),
(98, -150, 'francesco'),
(99, -150, 'francesco'),
(100, -150, 'daniele'),
(101, -100, 'daniele'),
(102, -50, 'daniele'),
(103, -150, 'daniele'),
(104, -150, 'francesco'),
(105, -150, 'francesco'),
(106, -50, 'marco'),
(107, -100, 'marco'),
(108, -150, 'marco'),
(109, -150, 'marco'),
(110, -150, 'marco'),
(111, 750, 'marco'),
(112, -150, 'marco'),
(113, 1100, 'marco'),
(114, 500, 'djkelo'),
(115, 200, 'djkelo'),
(116, 150, 'marco'),
(117, 0, 'marco'),
(118, -150, 'marco'),
(119, -150, 'marco'),
(120, -150, 'marco'),
(121, -150, 'marco'),
(122, -150, 'marco'),
(123, -150, 'marco'),
(124, 0, 'marco'),
(125, 350, 'marco'),
(126, 650, 'giulio'),
(127, 150, 'marco'),
(128, 450, 'marco'),
(129, -50, 'marco'),
(130, 750, 'davide'),
(131, 100, 'davide'),
(132, 400, 'davide'),
(133, 250, 'davide'),
(134, -150, 'davide'),
(135, -50, 'marco'),
(136, -150, 'marco'),
(137, 150, 'marco'),
(138, 50, 'marco'),
(139, -150, 'marco'),
(140, -150, 'marco'),
(141, 1100, 'marco'),
(142, 250, ''),
(143, 200, 'g5g5g5'),
(144, -150, 'g5g5g5'),
(145, -50, 'g5g5g5'),
(146, -150, 'g5g5g5'),
(147, 100, 'marco'),
(148, -150, 'marco'),
(149, -150, 'marco'),
(150, -150, 'marco'),
(151, -150, 'marco'),
(152, -150, 'marco'),
(153, 400, 'marco'),
(154, 750, 'ciaoo'),
(155, 50, 'marco'),
(156, 200, 'marco'),
(157, -150, 'marco');

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE IF NOT EXISTS `utente` (
  `Username` varchar(15) NOT NULL,
  `Password` varchar(15) NOT NULL,
  `Email` varchar(30) NOT NULL,
  PRIMARY KEY (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`Username`, `Password`, `Email`) VALUES
('asd1sada', 'ds113asda', ''),
('ciaoo', 'ciaoo', ''),
('daniele', 'aveta', ''),
('davide', 'delorentis', ''),
('djkelo', '05866', ''),
('francesco', 'dirienzo', ''),
('g5g5g5', 'g5g5g5', ''),
('giulio', 'turrisi', ''),
('marco', 'verbena', ''),
('marco92', 'verbena', ''),
('marco92_', 'marco', ''),
('mauro', 'gugliemino', ''),
('murax', 'marco', ''),
('tonyx', 'bavetta', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
