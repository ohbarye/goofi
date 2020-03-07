import AppBar from "@material-ui/core/AppBar";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {
  withStyles,
  WithStyles,
  StyleRulesCallback,
  Theme
} from "@material-ui/core/styles";
import * as React from "react";
import { GitHub } from "./icons/GitHub";
import LinearProgress from "@material-ui/core/LinearProgress";

export function Grouped(language) {
  function handleInputChange(event,value){
    console.log(event.value);// not required but value is needed therefore have to use this
    console.log(language);
    window.location.href = `/?language=${value.value}`;
  }

  return (
    <Autocomplete
      id="language"
      options={languageOptions}
      groupBy={option => option.type}
      getOptionLabel={option => option.name}
      style={{ width: 300 }}
      onChange={handleInputChange}
      renderInput={params => <TextField {...params} label="Select Language" variant="outlined" />}
    />
  );
}

const languageOptions = [
  { value: "",  name: "Any Language", type: "Any" },
  { value: "ActionScript",  name: "ActionScript", type: "Popular" },
  { value: "C",  name: "C", type: "Popular" },
  { value: "C#",  name: "C#", type: "Popular" },
  { value: "C++",  name: "C++", type: "Popular" },
  { value: "Clojure",  name: "Clojure", type: "Popular" },
  { value: "CoffeeScript",  name: "CoffeeScript", type: "Popular" },
  { value: "CSS",  name: "CSS", type: "Popular" },
  { value: "Go",  name: "Go", type: "Popular" },
  { value: "Haskell",  name: "Haskell", type: "Popular" },
  { value: "HTML",  name: "HTML", type: "Popular" },
  { value: "Java",  name: "Java", type: "Popular" },
  { value: "JavaScript",  name: "JavaScript", type: "Popular" },
  { value: "Lua",  name: "Lua", type: "Popular" },
  { value: "MATLAB",  name: "MATLAB", type: "Popular" },
  { value: "Objective-C",  name: "Objective-C", type: "Popular" },
  { value: "Perl",  name: "Perl", type: "Popular" },
  { value: "PHP",  name: "PHP", type: "Popular" },
  { value: "Python",  name: "Python", type: "Popular" },
  { value: "R",  name: "R", type: "Popular" },
  { value: "Ruby",  name: "Ruby", type: "Popular" },
  { value: "Scala",  name: "Scala", type: "Popular" },
  { value: "Shell",  name: "Shell", type: "Popular" },
  { value: "Swift",  name: "Swift", type: "Popular" },
  { value: "TeX",  name: "TeX", type: "Popular" },
  { value: "Vim script",  name: "Vim script", type: "Popular" },
  { value: "1C Enterprise",  name: "1C Enterprise", type:"Everything else" },
  { value: "4D",  name: "4D", type:"Everything else" },
  { value: "ABAP",  name: "ABAP", type:"Everything else" },
  { value: "ABNF",  name: "ABNF", type:"Everything else" },
  { value: "Ada",  name: "Ada", type:"Everything else" },
  { value: "Adobe Font Metrics",  name: "Adobe Font Metrics", type:"Everything else" },
  { value: "Agda",  name: "Agda", type:"Everything else" },
  { value: "AGS Script",  name: "AGS Script", type:"Everything else" },
  { value: "Alloy",  name: "Alloy", type:"Everything else" },
  { value: "Alpine Abuild",  name: "Alpine Abuild", type:"Everything else" },
  { value: "Altium Designer",  name: "Altium Designer", type:"Everything else" },
  { value: "AMPL",  name: "AMPL", type:"Everything else" },
  { value: "AngelScript",  name: "AngelScript", type:"Everything else" },
  { value: "Ant Build System",  name: "Ant Build System", type:"Everything else" },
  { value: "ANTLR",  name: "ANTLR", type:"Everything else" },
  { value: "ApacheConf",  name: "ApacheConf", type:"Everything else" },
  { value: "Apex",  name: "Apex", type:"Everything else" },
  { value: "API Blueprint",  name: "API Blueprint", type:"Everything else" },
  { value: "APL",  name: "APL", type:"Everything else" },
  { value: "Apollo Guidance Computer",  name: "Apollo Guidance Computer", type:"Everything else" },
  { value: "AppleScript",  name: "AppleScript", type:"Everything else" },
  { value: "Arc",  name: "Arc", type:"Everything else" },
  { value: "AsciiDoc",  name: "AsciiDoc", type:"Everything else" },
  { value: "ASN.1",  name: "ASN.1", type:"Everything else" },
  { value: "ASP",  name: "ASP", type:"Everything else" },
  { value: "AspectJ",  name: "AspectJ", type:"Everything else" },
  { value: "Assembly",  name: "Assembly", type:"Everything else" },
  { value: "Asymptote",  name: "Asymptote", type:"Everything else" },
  { value: "ATS",  name: "ATS", type:"Everything else" },
  { value: "Augeas",  name: "Augeas", type:"Everything else" },
  { value: "AutoHotkey",  name: "AutoHotkey", type:"Everything else" },
  { value: "AutoIt",  name: "AutoIt", type:"Everything else" },
  { value: "Awk",  name: "Awk", type:"Everything else" },
  { value: "Ballerina",  name: "Ballerina", type:"Everything else" },
  { value: "Batchfile",  name: "Batchfile", type:"Everything else" },
  { value: "Befunge",  name: "Befunge", type:"Everything else" },
  { value: "BibTeX",  name: "BibTeX", type:"Everything else" },
  { value: "Bison",  name: "Bison", type:"Everything else" },
  { value: "BitBake",  name: "BitBake", type:"Everything else" },
  { value: "Blade",  name: "Blade", type:"Everything else" },
  { value: "BlitzBasic",  name: "BlitzBasic", type:"Everything else" },
  { value: "BlitzMax",  name: "BlitzMax", type:"Everything else" },
  { value: "Bluespec",  name: "Bluespec", type:"Everything else" },
  { value: "Boo",  name: "Boo", type:"Everything else" },
  { value: "Brainfuck",  name: "Brainfuck", type:"Everything else" },
  { value: "Brightscript",  name: "Brightscript", type:"Everything else" },
  { value: "C-ObjDump",  name: "C-ObjDump", type:"Everything else" },
  { value: "C2hs Haskell",  name: "C2hs Haskell", type:"Everything else" },
  { value: "Cabal Config",  name: "Cabal Config", type:"Everything else" },
  { value: "Cap'n Proto",  name: "Cap'n Proto", type:"Everything else" },
  { value: "CartoCSS",  name: "CartoCSS", type:"Everything else" },
  { value: "Ceylon",  name: "Ceylon", type:"Everything else" },
  { value: "Chapel",  name: "Chapel", type:"Everything else" },
  { value: "Charity",  name: "Charity", type:"Everything else" },
  { value: "ChucK",  name: "ChucK", type:"Everything else" },
  { value: "Cirru",  name: "Cirru", type:"Everything else" },
  { value: "Clarion",  name: "Clarion", type:"Everything else" },
  { value: "Clean",  name: "Clean", type:"Everything else" },
  { value: "Click",  name: "Click", type:"Everything else" },
  { value: "CLIPS",  name: "CLIPS", type:"Everything else" },
  { value: "Closure Templates",  name: "Closure Templates", type:"Everything else" },
  { value: "Cloud Firestore Security Rules",  name: "Cloud Firestore Security Rules", type:"Everything else" },
  { value: "CMake",  name: "CMake", type:"Everything else" },
  { value: "COBOL",  name: "COBOL", type:"Everything else" },
  { value: "ColdFusion",  name: "ColdFusion", type:"Everything else" },
  { value: "ColdFusion CFC",  name: "ColdFusion CFC", type:"Everything else" },
  { value: "COLLADA",  name: "COLLADA", type:"Everything else" },
  { value: "Common Lisp",  name: "Common Lisp", type:"Everything else" },
  { value: "Common Workflow Language",  name: "Common Workflow Language", type:"Everything else" },
  { value: "Component Pascal",  name: "Component Pascal", type:"Everything else" },
  { value: "CoNLL-U",  name: "CoNLL-U", type:"Everything else" },
  { value: "Cool",  name: "Cool", type:"Everything else" },
  { value: "Coq",  name: "Coq", type:"Everything else" },
  { value: "Cpp-ObjDump",  name: "Cpp-ObjDump", type:"Everything else" },
  { value: "Creole",  name: "Creole", type:"Everything else" },
  { value: "Crystal",  name: "Crystal", type:"Everything else" },
  { value: "CSON",  name: "CSON", type:"Everything else" },
  { value: "Csound",  name: "Csound", type:"Everything else" },
  { value: "Csound Document",  name: "Csound Document", type:"Everything else" },
  { value: "Csound Score",  name: "Csound Score", type:"Everything else" },
  { value: "CSV",  name: "CSV", type:"Everything else" },
  { value: "Cuda",  name: "Cuda", type:"Everything else" },
  { value: "cURL Config",  name: "cURL Config", type:"Everything else" },
  { value: "CWeb",  name: "CWeb", type:"Everything else" },
  { value: "Cycript",  name: "Cycript", type:"Everything else" },
  { value: "Cython",  name: "Cython", type:"Everything else" },
  { value: "D",  name: "D", type:"Everything else" },
  { value: "D-ObjDump",  name: "D-ObjDump", type:"Everything else" },
  { value: "Darcs Patch",  name: "Darcs Patch", type:"Everything else" },
  { value: "Dart",  name: "Dart", type:"Everything else" },
  { value: "DataWeave",  name: "DataWeave", type:"Everything else" },
  { value: "desktop",  name: "desktop", type:"Everything else" },
  { value: "Dhall",  name: "Dhall", type:"Everything else" },
  { value: "Diff",  name: "Diff", type:"Everything else" },
  { value: "DIGITAL Command Language",  name: "DIGITAL Command Language", type:"Everything else" },
  { value: "dircolors",  name: "dircolors", type:"Everything else" },
  { value: "DirectX 3D File",  name: "DirectX 3D File", type:"Everything else" },
  { value: "DM",  name: "DM", type:"Everything else" },
  { value: "DNS Zone",  name: "DNS Zone", type:"Everything else" },
  { value: "Dockerfile",  name: "Dockerfile", type:"Everything else" },
  { value: "Dogescript",  name: "Dogescript", type:"Everything else" },
  { value: "DTrace",  name: "DTrace", type:"Everything else" },
  { value: "Dylan",  name: "Dylan", type:"Everything else" },
  { value: "E",  name: "E", type:"Everything else" },
  { value: "Eagle",  name: "Eagle", type:"Everything else" },
  { value: "Easybuild",  name: "Easybuild", type:"Everything else" },
  { value: "EBNF",  name: "EBNF", type:"Everything else" },
  { value: "eC",  name: "eC", type:"Everything else" },
  { value: "Ecere Projects",  name: "Ecere Projects", type:"Everything else" },
  { value: "ECL",  name: "ECL", type:"Everything else" },
  { value: "ECLiPSe",  name: "ECLiPSe", type:"Everything else" },
  { value: "EditorConfig",  name: "EditorConfig", type:"Everything else" },
  { value: "Edje Data Collection",  name: "Edje Data Collection", type:"Everything else" },
  { value: "edn",  name: "edn", type:"Everything else" },
  { value: "Eiffel",  name: "Eiffel", type:"Everything else" },
  { value: "EJS",  name: "EJS", type:"Everything else" },
  { value: "Elixir",  name: "Elixir", type:"Everything else" },
  { value: "Elm",  name: "Elm", type:"Everything else" },
  { value: "Emacs Lisp",  name: "Emacs Lisp", type:"Everything else" },
  { value: "EmberScript",  name: "EmberScript", type:"Everything else" },
  { value: "EML",  name: "EML", type:"Everything else" },
  { value: "EQ",  name: "EQ", type:"Everything else" },
  { value: "Erlang",  name: "Erlang", type:"Everything else" },
  { value: "F#",  name: "F#", type:"Everything else" },
  { value: "F*",  name: "F*", type:"Everything else" },
  { value: "Factor",  name: "Factor", type:"Everything else" },
  { value: "Fancy",  name: "Fancy", type:"Everything else" },
  { value: "Fantom",  name: "Fantom", type:"Everything else" },
  { value: "Faust",  name: "Faust", type:"Everything else" },
  { value: "FIGlet Font",  name: "FIGlet Font", type:"Everything else" },
  { value: "Filebench WML",  name: "Filebench WML", type:"Everything else" },
  { value: "Filterscript",  name: "Filterscript", type:"Everything else" },
  { value: "fish",  name: "fish", type:"Everything else" },
  { value: "FLUX",  name: "FLUX", type:"Everything else" },
  { value: "Formatted",  name: "Formatted", type:"Everything else" },
  { value: "Forth",  name: "Forth", type:"Everything else" },
  { value: "Fortran",  name: "Fortran", type:"Everything else" },
  { value: "FreeMarker",  name: "FreeMarker", type:"Everything else" },
  { value: "Frege",  name: "Frege", type:"Everything else" },
  { value: "G-code",  name: "G-code", type:"Everything else" },
  { value: "Game Maker Language",  name: "Game Maker Language", type:"Everything else" },
  { value: "GAML",  name: "GAML", type:"Everything else" },
  { value: "GAMS",  name: "GAMS", type:"Everything else" },
  { value: "GAP",  name: "GAP", type:"Everything else" },
  { value: "GCC Machine Description",  name: "GCC Machine Description", type:"Everything else" },
  { value: "GDB",  name: "GDB", type:"Everything else" },
  { value: "GDScript",  name: "GDScript", type:"Everything else" },
  { value: "Genie",  name: "Genie", type:"Everything else" },
  { value: "Genshi",  name: "Genshi", type:"Everything else" },
  { value: "Gentoo Ebuild",  name: "Gentoo Ebuild", type:"Everything else" },
  { value: "Gentoo Eclass",  name: "Gentoo Eclass", type:"Everything else" },
  { value: "Gerber Image",  name: "Gerber Image", type:"Everything else" },
  { value: "Gettext Catalog",  name: "Gettext Catalog", type:"Everything else" },
  { value: "Gherkin",  name: "Gherkin", type:"Everything else" },
  { value: "Git Attributes",  name: "Git Attributes", type:"Everything else" },
  { value: "Git Config",  name: "Git Config", type:"Everything else" },
  { value: "GLSL",  name: "GLSL", type:"Everything else" },
  { value: "Glyph",  name: "Glyph", type:"Everything else" },
  { value: "Glyph Bitmap Distribution Format",  name: "Glyph Bitmap Distribution Format", type:"Everything else" },
  { value: "GN",  name: "GN", type:"Everything else" },
  { value: "Gnuplot",  name: "Gnuplot", type:"Everything else" },
  { value: "Golo",  name: "Golo", type:"Everything else" },
  { value: "Gosu",  name: "Gosu", type:"Everything else" },
  { value: "Grace",  name: "Grace", type:"Everything else" },
  { value: "Gradle",  name: "Gradle", type:"Everything else" },
  { value: "Grammatical Framework",  name: "Grammatical Framework", type:"Everything else" },
  { value: "Graph Modeling Language",  name: "Graph Modeling Language", type:"Everything else" },
  { value: "GraphQL",  name: "GraphQL", type:"Everything else" },
  { value: "Graphviz (DOT)",  name: "Graphviz (DOT)", type:"Everything else" },
  { value: "Groovy",  name: "Groovy", type:"Everything else" },
  { value: "Groovy Server Pages",  name: "Groovy Server Pages", type:"Everything else" },
  { value: "Hack",  name: "Hack", type:"Everything else" },
  { value: "Haml",  name: "Haml", type:"Everything else" },
  { value: "Handlebars",  name: "Handlebars", type:"Everything else" },
  { value: "HAProxy",  name: "HAProxy", type:"Everything else" },
  { value: "Harbour",  name: "Harbour", type:"Everything else" },
  { value: "Haxe",  name: "Haxe", type:"Everything else" },
  { value: "HCL",  name: "HCL", type:"Everything else" },
  { value: "HiveQL",  name: "HiveQL", type:"Everything else" },
  { value: "HLSL",  name: "HLSL", type:"Everything else" },
  { value: "HolyC",  name: "HolyC", type:"Everything else" },
  { value: "HTML+Django",  name: "HTML+Django", type:"Everything else" },
  { value: "HTML+ECR",  name: "HTML+ECR", type:"Everything else" },
  { value: "HTML+EEX",  name: "HTML+EEX", type:"Everything else" },
  { value: "HTML+ERB",  name: "HTML+ERB", type:"Everything else" },
  { value: "HTML+PHP",  name: "HTML+PHP", type:"Everything else" },
  { value: "HTML+Razor",  name: "HTML+Razor", type:"Everything else" },
  { value: "HTTP",  name: "HTTP", type:"Everything else" },
  { value: "HXML",  name: "HXML", type:"Everything else" },
  { value: "Hy",  name: "Hy", type:"Everything else" },
  { value: "HyPhy",  name: "HyPhy", type:"Everything else" },
  { value: "IDL",  name: "IDL", type:"Everything else" },
  { value: "Idris",  name: "Idris", type:"Everything else" },
  { value: "Ignore List",  name: "Ignore List", type:"Everything else" },
  { value: "IGOR Pro",  name: "IGOR Pro", type:"Everything else" },
  { value: "Inform 7",  name: "Inform 7", type:"Everything else" },
  { value: "INI",  name: "INI", type:"Everything else" },
  { value: "Inno Setup",  name: "Inno Setup", type:"Everything else" },
  { value: "Io",  name: "Io", type:"Everything else" },
  { value: "Ioke",  name: "Ioke", type:"Everything else" },
  { value: "IRC log",  name: "IRC log", type:"Everything else" },
  { value: "Isabelle",  name: "Isabelle", type:"Everything else" },
  { value: "Isabelle ROOT",  name: "Isabelle ROOT", type:"Everything else" },
  { value: "J",  name: "J", type:"Everything else" },
  { value: "Jasmin",  name: "Jasmin", type:"Everything else" },
  { value: "Java Properties",  name: "Java Properties", type:"Everything else" },
  { value: "Java Server Pages",  name: "Java Server Pages", type:"Everything else" },
  { value: "JavaScript+ERB",  name: "JavaScript+ERB", type:"Everything else" },
  { value: "JFlex",  name: "JFlex", type:"Everything else" },
  { value: "Jison",  name: "Jison", type:"Everything else" },
  { value: "Jison Lex",  name: "Jison Lex", type:"Everything else" },
  { value: "Jolie",  name: "Jolie", type:"Everything else" },
  { value: "JSON",  name: "JSON", type:"Everything else" },
  { value: "JSON with Comments",  name: "JSON with Comments", type:"Everything else" },
  { value: "JSON5",  name: "JSON5", type:"Everything else" },
  { value: "JSONiq",  name: "JSONiq", type:"Everything else" },
  { value: "JSONLD",  name: "JSONLD", type:"Everything else" },
  { value: "Jsonnet",  name: "Jsonnet", type:"Everything else" },
  { value: "JSX",  name: "JSX", type:"Everything else" },
  { value: "Julia",  name: "Julia", type:"Everything else" },
  { value: "Jupyter Notebook",  name: "Jupyter Notebook", type:"Everything else" },
  { value: "KiCad Layout",  name: "KiCad Layout", type:"Everything else" },
  { value: "KiCad Legacy Layout",  name: "KiCad Legacy Layout", type:"Everything else" },
  { value: "KiCad Schematic",  name: "KiCad Schematic", type:"Everything else" },
  { value: "Kit",  name: "Kit", type:"Everything else" },
  { value: "Kotlin",  name: "Kotlin", type:"Everything else" },
  { value: "KRL",  name: "KRL", type:"Everything else" },
  { value: "LabVIEW",  name: "LabVIEW", type:"Everything else" },
  { value: "Lasso",  name: "Lasso", type:"Everything else" },
  { value: "Latte",  name: "Latte", type:"Everything else" },
  { value: "Lean",  name: "Lean", type:"Everything else" },
  { value: "Less",  name: "Less", type:"Everything else" },
  { value: "Lex",  name: "Lex", type:"Everything else" },
  { value: "LFE",  name: "LFE", type:"Everything else" },
  { value: "LilyPond",  name: "LilyPond", type:"Everything else" },
  { value: "Limbo",  name: "Limbo", type:"Everything else" },
  { value: "Linker Script",  name: "Linker Script", type:"Everything else" },
  { value: "Linux Kernel Module",  name: "Linux Kernel Module", type:"Everything else" },
  { value: "Liquid",  name: "Liquid", type:"Everything else" },
  { value: "Literate Agda",  name: "Literate Agda", type:"Everything else" },
  { value: "Literate CoffeeScript",  name: "Literate CoffeeScript", type:"Everything else" },
  { value: "Literate Haskell",  name: "Literate Haskell", type:"Everything else" },
  { value: "LiveScript",  name: "LiveScript", type:"Everything else" },
  { value: "LLVM",  name: "LLVM", type:"Everything else" },
  { value: "Logos",  name: "Logos", type:"Everything else" },
  { value: "Logtalk",  name: "Logtalk", type:"Everything else" },
  { value: "LOLCODE",  name: "LOLCODE", type:"Everything else" },
  { value: "LookML",  name: "LookML", type:"Everything else" },
  { value: "LoomScript",  name: "LoomScript", type:"Everything else" },
  { value: "LSL",  name: "LSL", type:"Everything else" },
  { value: "LTspice Symbol",  name: "LTspice Symbol", type:"Everything else" },
  { value: "M",  name: "M", type:"Everything else" },
  { value: "M4",  name: "M4", type:"Everything else" },
  { value: "M4Sugar",  name: "M4Sugar", type:"Everything else" },
  { value: "Makefile",  name: "Makefile", type:"Everything else" },
  { value: "Mako",  name: "Mako", type:"Everything else" },
  { value: "Markdown",  name: "Markdown", type:"Everything else" },
  { value: "Marko",  name: "Marko", type:"Everything else" },
  { value: "Mask",  name: "Mask", type:"Everything else" },
  { value: "Mathematica",  name: "Mathematica", type:"Everything else" },
  { value: "Maven POM",  name: "Maven POM", type:"Everything else" },
  { value: "Max",  name: "Max", type:"Everything else" },
  { value: "MAXScript",  name: "MAXScript", type:"Everything else" },
  { value: "mcfunction",  name: "mcfunction", type:"Everything else" },
  { value: "MediaWiki",  name: "MediaWiki", type:"Everything else" },
  { value: "Mercury",  name: "Mercury", type:"Everything else" },
  { value: "Meson",  name: "Meson", type:"Everything else" },
  { value: "Metal",  name: "Metal", type:"Everything else" },
  { value: "Microsoft Developer Studio Project",  name: "Microsoft Developer Studio Project", type:"Everything else" },
  { value: "MiniD",  name: "MiniD", type:"Everything else" },
  { value: "Mirah",  name: "Mirah", type:"Everything else" },
  { value: "mIRC Script",  name: "mIRC Script", type:"Everything else" },
  { value: "MLIR",  name: "MLIR", type:"Everything else" },
  { value: "Modelica",  name: "Modelica", type:"Everything else" },
  { value: "Modula-2",  name: "Modula-2", type:"Everything else" },
  { value: "Modula-3",  name: "Modula-3", type:"Everything else" },
  { value: "Module Management System",  name: "Module Management System", type:"Everything else" },
  { value: "Monkey",  name: "Monkey", type:"Everything else" },
  { value: "Moocode",  name: "Moocode", type:"Everything else" },
  { value: "MoonScript",  name: "MoonScript", type:"Everything else" },
  { value: "Motorola 68K Assembly",  name: "Motorola 68K Assembly", type:"Everything else" },
  { value: "MQL4",  name: "MQL4", type:"Everything else" },
  { value: "MQL5",  name: "MQL5", type:"Everything else" },
  { value: "MTML",  name: "MTML", type:"Everything else" },
  { value: "MUF",  name: "MUF", type:"Everything else" },
  { value: "mupad",  name: "mupad", type:"Everything else" },
  { value: "Muse",  name: "Muse", type:"Everything else" },
  { value: "Myghty",  name: "Myghty", type:"Everything else" },
  { value: "nanorc",  name: "nanorc", type:"Everything else" },
  { value: "NCL",  name: "NCL", type:"Everything else" },
  { value: "Nearley",  name: "Nearley", type:"Everything else" },
  { value: "Nemerle",  name: "Nemerle", type:"Everything else" },
  { value: "nesC",  name: "nesC", type:"Everything else" },
  { value: "NetLinx",  name: "NetLinx", type:"Everything else" },
  { value: "NetLinx+ERB",  name: "NetLinx+ERB", type:"Everything else" },
  { value: "NetLogo",  name: "NetLogo", type:"Everything else" },
  { value: "NewLisp",  name: "NewLisp", type:"Everything else" },
  { value: "Nextflow",  name: "Nextflow", type:"Everything else" },
  { value: "Nginx",  name: "Nginx", type:"Everything else" },
  { value: "Nim",  name: "Nim", type:"Everything else" },
  { value: "Ninja",  name: "Ninja", type:"Everything else" },
  { value: "Nit",  name: "Nit", type:"Everything else" },
  { value: "Nix",  name: "Nix", type:"Everything else" },
  { value: "NL",  name: "NL", type:"Everything else" },
  { value: "NPM Config",  name: "NPM Config", type:"Everything else" },
  { value: "NSIS",  name: "NSIS", type:"Everything else" },
  { value: "Nu",  name: "Nu", type:"Everything else" },
  { value: "NumPy",  name: "NumPy", type:"Everything else" },
  { value: "ObjDump",  name: "ObjDump", type:"Everything else" },
  { value: "Object Data Instance Notation",  name: "Object Data Instance Notation", type:"Everything else" },
  { value: "Objective-C++",  name: "Objective-C++", type:"Everything else" },
  { value: "Objective-J",  name: "Objective-J", type:"Everything else" },
  { value: "ObjectScript",  name: "ObjectScript", type:"Everything else" },
  { value: "OCaml",  name: "OCaml", type:"Everything else" },
  { value: "Odin",  name: "Odin", type:"Everything else" },
  { value: "Omgrofl",  name: "Omgrofl", type:"Everything else" },
  { value: "ooc",  name: "ooc", type:"Everything else" },
  { value: "Opa",  name: "Opa", type:"Everything else" },
  { value: "Opal",  name: "Opal", type:"Everything else" },
  { value: "Open Policy Agent",  name: "Open Policy Agent", type:"Everything else" },
  { value: "OpenCL",  name: "OpenCL", type:"Everything else" },
  { value: "OpenEdge ABL",  name: "OpenEdge ABL", type:"Everything else" },
  { value: "OpenRC runscript",  name: "OpenRC runscript", type:"Everything else" },
  { value: "OpenSCAD",  name: "OpenSCAD", type:"Everything else" },
  { value: "OpenStep Property List",  name: "OpenStep Property List", type:"Everything else" },
  { value: "OpenType Feature File",  name: "OpenType Feature File", type:"Everything else" },
  { value: "Org",  name: "Org", type:"Everything else" },
  { value: "Ox",  name: "Ox", type:"Everything else" },
  { value: "Oxygene",  name: "Oxygene", type:"Everything else" },
  { value: "Oz",  name: "Oz", type:"Everything else" },
  { value: "P4",  name: "P4", type:"Everything else" },
  { value: "Pan",  name: "Pan", type:"Everything else" },
  { value: "Papyrus",  name: "Papyrus", type:"Everything else" },
  { value: "Parrot",  name: "Parrot", type:"Everything else" },
  { value: "Parrot Assembly",  name: "Parrot Assembly", type:"Everything else" },
  { value: "Parrot Internal Representation",  name: "Parrot Internal Representation", type:"Everything else" },
  { value: "Pascal",  name: "Pascal", type:"Everything else" },
  { value: "Pawn",  name: "Pawn", type:"Everything else" },
  { value: "Pep8",  name: "Pep8", type:"Everything else" },
  { value: "Pic",  name: "Pic", type:"Everything else" },
  { value: "Pickle",  name: "Pickle", type:"Everything else" },
  { value: "PicoLisp",  name: "PicoLisp", type:"Everything else" },
  { value: "PigLatin",  name: "PigLatin", type:"Everything else" },
  { value: "Pike",  name: "Pike", type:"Everything else" },
  { value: "PLpgSQL",  name: "PLpgSQL", type:"Everything else" },
  { value: "PLSQL",  name: "PLSQL", type:"Everything else" },
  { value: "Pod",  name: "Pod", type:"Everything else" },
  { value: "Pod 6",  name: "Pod 6", type:"Everything else" },
  { value: "PogoScript",  name: "PogoScript", type:"Everything else" },
  { value: "Pony",  name: "Pony", type:"Everything else" },
  { value: "PostCSS",  name: "PostCSS", type:"Everything else" },
  { value: "PostScript",  name: "PostScript", type:"Everything else" },
  { value: "POV-Ray SDL",  name: "POV-Ray SDL", type:"Everything else" },
  { value: "PowerBuilder",  name: "PowerBuilder", type:"Everything else" },
  { value: "PowerShell",  name: "PowerShell", type:"Everything else" },
  { value: "Prisma",  name: "Prisma", type:"Everything else" },
  { value: "Processing",  name: "Processing", type:"Everything else" },
  { value: "Proguard",  name: "Proguard", type:"Everything else" },
  { value: "Prolog",  name: "Prolog", type:"Everything else" },
  { value: "Propeller Spin",  name: "Propeller Spin", type:"Everything else" },
  { value: "Protocol Buffer",  name: "Protocol Buffer", type:"Everything else" },
  { value: "Public Key",  name: "Public Key", type:"Everything else" },
  { value: "Pug",  name: "Pug", type:"Everything else" },
  { value: "Puppet",  name: "Puppet", type:"Everything else" },
  { value: "Pure Data",  name: "Pure Data", type:"Everything else" },
  { value: "PureBasic",  name: "PureBasic", type:"Everything else" },
  { value: "PureScript",  name: "PureScript", type:"Everything else" },
  { value: "Python console",  name: "Python console", type:"Everything else" },
  { value: "Python traceback",  name: "Python traceback", type:"Everything else" },
  { value: "q",  name: "q", type:"Everything else" },
  { value: "QMake",  name: "QMake", type:"Everything else" },
  { value: "QML",  name: "QML", type:"Everything else" },
  { value: "Quake",  name: "Quake", type:"Everything else" },
  { value: "Racket",  name: "Racket", type:"Everything else" },
  { value: "Ragel",  name: "Ragel", type:"Everything else" },
  { value: "Raku",  name: "Raku", type:"Everything else" },
  { value: "RAML",  name: "RAML", type:"Everything else" },
  { value: "Rascal",  name: "Rascal", type:"Everything else" },
  { value: "Raw token data",  name: "Raw token data", type:"Everything else" },
  { value: "RDoc",  name: "RDoc", type:"Everything else" },
  { value: "Readline Config",  name: "Readline Config", type:"Everything else" },
  { value: "REALbasic",  name: "REALbasic", type:"Everything else" },
  { value: "Reason",  name: "Reason", type:"Everything else" },
  { value: "Rebol",  name: "Rebol", type:"Everything else" },
  { value: "Red",  name: "Red", type:"Everything else" },
  { value: "Redcode",  name: "Redcode", type:"Everything else" },
  { value: "Regular Expression",  name: "Regular Expression", type:"Everything else" },
  { value: "Ren'Py",  name: "Ren'Py", type:"Everything else" },
  { value: "RenderScript",  name: "RenderScript", type:"Everything else" },
  { value: "reStructuredText",  name: "reStructuredText", type:"Everything else" },
  { value: "REXX",  name: "REXX", type:"Everything else" },
  { value: "RHTML",  name: "RHTML", type:"Everything else" },
  { value: "Rich Text Format",  name: "Rich Text Format", type:"Everything else" },
  { value: "Ring",  name: "Ring", type:"Everything else" },
  { value: "Riot",  name: "Riot", type:"Everything else" },
  { value: "RMarkdown",  name: "RMarkdown", type:"Everything else" },
  { value: "RobotFramework",  name: "RobotFramework", type:"Everything else" },
  { value: "Roff",  name: "Roff", type:"Everything else" },
  { value: "Roff Manpage",  name: "Roff Manpage", type:"Everything else" },
  { value: "Rouge",  name: "Rouge", type:"Everything else" },
  { value: "RPC",  name: "RPC", type:"Everything else" },
  { value: "RPM Spec",  name: "RPM Spec", type:"Everything else" },
  { value: "RUNOFF",  name: "RUNOFF", type:"Everything else" },
  { value: "Rust",  name: "Rust", type:"Everything else" },
  { value: "Sage",  name: "Sage", type:"Everything else" },
  { value: "SaltStack",  name: "SaltStack", type:"Everything else" },
  { value: "SAS",  name: "SAS", type:"Everything else" },
  { value: "Sass",  name: "Sass", type:"Everything else" },
  { value: "Scaml",  name: "Scaml", type:"Everything else" },
  { value: "Scheme",  name: "Scheme", type:"Everything else" },
  { value: "Scilab",  name: "Scilab", type:"Everything else" },
  { value: "SCSS",  name: "SCSS", type:"Everything else" },
  { value: "sed",  name: "sed", type:"Everything else" },
  { value: "Self",  name: "Self", type:"Everything else" },
  { value: "ShaderLab",  name: "ShaderLab", type:"Everything else" },
  { value: "ShellSession",  name: "ShellSession", type:"Everything else" },
  { value: "Shen",  name: "Shen", type:"Everything else" },
  { value: "Slash",  name: "Slash", type:"Everything else" },
  { value: "Slice",  name: "Slice", type:"Everything else" },
  { value: "Slim",  name: "Slim", type:"Everything else" },
  { value: "Smali",  name: "Smali", type:"Everything else" },
  { value: "Smalltalk",  name: "Smalltalk", type:"Everything else" },
  { value: "Smarty",  name: "Smarty", type:"Everything else" },
  { value: "SmPL",  name: "SmPL", type:"Everything else" },
  { value: "SMT",  name: "SMT", type:"Everything else" },
  { value: "Solidity",  name: "Solidity", type:"Everything else" },
  { value: "SourcePawn",  name: "SourcePawn", type:"Everything else" },
  { value: "SPARQL",  name: "SPARQL", type:"Everything else" },
  { value: "Spline Font Database",  name: "Spline Font Database", type:"Everything else" },
  { value: "SQF",  name: "SQF", type:"Everything else" },
  { value: "SQL",  name: "SQL", type:"Everything else" },
  { value: "SQLPL",  name: "SQLPL", type:"Everything else" },
  { value: "Squirrel",  name: "Squirrel", type:"Everything else" },
  { value: "SRecode Template",  name: "SRecode Template", type:"Everything else" },
  { value: "SSH Config",  name: "SSH Config", type:"Everything else" },
  { value: "Stan",  name: "Stan", type:"Everything else" },
  { value: "Standard ML",  name: "Standard ML", type:"Everything else" },
  { value: "Starlark",  name: "Starlark", type:"Everything else" },
  { value: "Stata",  name: "Stata", type:"Everything else" },
  { value: "STON",  name: "STON", type:"Everything else" },
  { value: "Stylus",  name: "Stylus", type:"Everything else" },
  { value: "SubRip Text",  name: "SubRip Text", type:"Everything else" },
  { value: "SugarSS",  name: "SugarSS", type:"Everything else" },
  { value: "SuperCollider",  name: "SuperCollider", type:"Everything else" },
  { value: "Svelte",  name: "Svelte", type:"Everything else" },
  { value: "SVG",  name: "SVG", type:"Everything else" },
  { value: "SWIG",  name: "SWIG", type:"Everything else" },
  { value: "SystemVerilog",  name: "SystemVerilog", type:"Everything else" },
  { value: "Tcl",  name: "Tcl", type:"Everything else" },
  { value: "Tcsh",  name: "Tcsh", type:"Everything else" },
  { value: "Tea",  name: "Tea", type:"Everything else" },
  { value: "Terra",  name: "Terra", type:"Everything else" },
  { value: "Texinfo",  name: "Texinfo", type:"Everything else" },
  { value: "Text",  name: "Text", type:"Everything else" },
  { value: "Textile",  name: "Textile", type:"Everything else" },
  { value: "Thrift",  name: "Thrift", type:"Everything else" },
  { value: "TI Program",  name: "TI Program", type:"Everything else" },
  { value: "TLA",  name: "TLA", type:"Everything else" },
  { value: "TOML",  name: "TOML", type:"Everything else" },
  { value: "TSQL",  name: "TSQL", type:"Everything else" },
  { value: "TSX",  name: "TSX", type:"Everything else" },
  { value: "Turing",  name: "Turing", type:"Everything else" },
  { value: "Turtle",  name: "Turtle", type:"Everything else" },
  { value: "Twig",  name: "Twig", type:"Everything else" },
  { value: "TXL",  name: "TXL", type:"Everything else" },
  { value: "Type Language",  name: "Type Language", type:"Everything else" },
  { value: "TypeScript",  name: "TypeScript", type:"Everything else" },
  { value: "Unified Parallel C",  name: "Unified Parallel C", type:"Everything else" },
  { value: "Unity3D Asset",  name: "Unity3D Asset", type:"Everything else" },
  { value: "Unix Assembly",  name: "Unix Assembly", type:"Everything else" },
  { value: "Uno",  name: "Uno", type:"Everything else" },
  { value: "UnrealScript",  name: "UnrealScript", type:"Everything else" },
  { value: "UrWeb",  name: "UrWeb", type:"Everything else" },
  { value: "V",  name: "V", type:"Everything else" },
  { value: "Vala",  name: "Vala", type:"Everything else" },
  { value: "VBA",  name: "VBA", type:"Everything else" },
  { value: "VBScript",  name: "VBScript", type:"Everything else" },
  { value: "VCL",  name: "VCL", type:"Everything else" },
  { value: "Verilog",  name: "Verilog", type:"Everything else" },
  { value: "VHDL",  name: "VHDL", type:"Everything else" },
  { value: "Vim Snippet",  name: "Vim Snippet", type:"Everything else" },
  { value: "Visual Basic .NET",  name: "Visual Basic .NET", type:"Everything else" },
  { value: "Volt",  name: "Volt", type:"Everything else" },
  { value: "Vue",  name: "Vue", type:"Everything else" },
  { value: "Wavefront Material",  name: "Wavefront Material", type:"Everything else" },
  { value: "Wavefront Object",  name: "Wavefront Object", type:"Everything else" },
  { value: "wdl",  name: "wdl", type:"Everything else" },
  { value: "Web Ontology Language",  name: "Web Ontology Language", type:"Everything else" },
  { value: "WebAssembly",  name: "WebAssembly", type:"Everything else" },
  { value: "WebIDL",  name: "WebIDL", type:"Everything else" },
  { value: "WebVTT",  name: "WebVTT", type:"Everything else" },
  { value: "Wget Config",  name: "Wget Config", type:"Everything else" },
  { value: "Windows Registry Entries",  name: "Windows Registry Entries", type:"Everything else" },
  { value: "wisp",  name: "wisp", type:"Everything else" },
  { value: "Wollok",  name: "Wollok", type:"Everything else" },
  { value: "World of Warcraft Addon Data",  name: "World of Warcraft Addon Data", type:"Everything else" },
  { value: "X BitMap",  name: "X BitMap", type:"Everything else" },
  { value: "X Font Directory Index",  name: "X Font Directory Index", type:"Everything else" },
  { value: "X PixMap",  name: "X PixMap", type:"Everything else" },
  { value: "X10",  name: "X10", type:"Everything else" },
  { value: "xBase",  name: "xBase", type:"Everything else" },
  { value: "XC",  name: "XC", type:"Everything else" },
  { value: "XCompose",  name: "XCompose", type:"Everything else" },
  { value: "XML",  name: "XML", type:"Everything else" },
  { value: "XML Property List",  name: "XML Property List", type:"Everything else" },
  { value: "Xojo",  name: "Xojo", type:"Everything else" },
  { value: "XPages",  name: "XPages", type:"Everything else" },
  { value: "XProc",  name: "XProc", type:"Everything else" },
  { value: "XQuery",  name: "XQuery", type:"Everything else" },
  { value: "XS",  name: "XS", type:"Everything else" },
  { value: "XSLT",  name: "XSLT", type:"Everything else" },
  { value: "Xtend",  name: "Xtend", type:"Everything else" },
  { value: "Yacc",  name: "Yacc", type:"Everything else" },
  { value: "YAML",  name: "YAML", type:"Everything else" },
  { value: "YANG",  name: "YANG", type:"Everything else" },
  { value: "YARA",  name: "YARA", type:"Everything else" },
  { value: "YASnippet",  name: "YASnippet", type:"Everything else" },
  { value: "ZAP",  name: "ZAP", type:"Everything else" },
  { value: "Zeek",  name: "Zeek", type:"Everything else" },
  { value: "ZenScript",  name: "ZenScript", type:"Everything else" },
  { value: "Zephir",  name: "Zephir", type:"Everything else" },
  { value: "Zig",  name: "Zig", type:"Everything else" },
  { value: "ZIL",  name: "ZIL", type:"Everything else" },
  { value: "Zimpl",  name: "Zimpl", type:"Everything else" }  
];

const styles: StyleRulesCallback<Theme, Props> = _ => ({
  select: {
    color: "#fff"
  },
  title: {
    flex: "1",
    textAlign: "left"
  }
});

interface Props extends WithStyles<typeof styles> {
  language: string;
  fetchedRepositoryCount: number;
  totalRepositoryCount: number;
}

const progress = (
  fetchedReposCount: number,
  repositoryCount: number
): number => {
  if (repositoryCount === 0) {
    return 0;
  }

  return (fetchedReposCount / repositoryCount) * 100;
};

const Header: React.FC<Props> = ({
  language,
  fetchedRepositoryCount,
  totalRepositoryCount
}: Props) => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Good First Issues
        </Typography>

        {this.Grouped(language)}

        <Tooltip title="GitHub repository" enterDelay={200}>
          <IconButton
            color="inherit"
            component="a"
            href="https://github.com/ohbarye/goofi"
            target="_blank"
          >
            <GitHub />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Tooltip
        title={`${fetchedRepositoryCount} / ${totalRepositoryCount}`}
        enterDelay={200}
        placement="bottom-end"
      >
        <LinearProgress
          color="secondary"
          variant="determinate"
          value={progress(fetchedRepositoryCount, totalRepositoryCount)}
        />
      </Tooltip>
    </AppBar>
  );
};

export default withStyles(styles)(Header);
