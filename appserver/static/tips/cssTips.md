# Css

## **Splunk Tips:**

[https://dev.splunk.com/enterprise/docs/developapps/visualizedata/usesplunkdashboardstyles](https://dev.splunk.com/enterprise/docs/developapps/visualizedata/usesplunkdashboardstyles)

Aufbau Rows und Panels:

![./images/SplunkCssOverview.png](./images/SplunkCssOverview.png)

Aufbau von Row und Panels

```
dashboard-body
    dashboard-row
        dashboard-cell
            dashboard-panel
                panel-head
                panel-body

```

Aufbau einer Splunk View:

```
.dashboard-element
	.dashboard-element-header → progress, errors, title
	.dashboard-element-body → view
	.dashboard-element-footer → search-bar
```

## **CSS-Regeln allgemein:**

Info-Resource: [https://developer.mozilla.org/en-US/docs/Web/CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

### **Cascade:**

alle folgenden Regeln greifen ineinander:

### **Inheritance / Vererbung**

- Child-Elements erben bestimmte Eigenschaften von ihren Eltern

- Text-bezogene Attribute (Font, color, etc) 

- Box-bezogene Attribute NICHT (margin, padding, background, border)

### **Order / Reihenfolge**

- Browser → Default Browser Einstellungen
- User → Der Nutzer kann eigene Browser-weite Einstellungen hinterlegen
- Author → ab hier kommen wir bzw. Splunk
- external → eingebundene Scripte
- embedded → direkt eingebettet im Script-Tag
- inline → am Element selbst hinterlegt (style-Attribute)

- zuletzt geladenes CSS gewinnt:
    - Lade-Reihenfolge externer Dateien
    - gleiche Selectoren innerhalb einer Datei


### **Specificity**

Je eindeutiger bzw. spezifischer die Selektoren, desto stärker greift die Regel. In der folgenden Tabelle ist die "Wertigkeit" der Selektoren aufgeführt. Jeder Selektor einer Klasse/Wertigkeit wird aufsummiert.

| Selector                             | x 10.000    | x 1.000   | x 100    | x 10 | x 1  | 
| ---------                            | ------------| --------- | ---------| -----| -----|
| *                                    | 0           | 0         | 0        | 0    | 0    | 
| elements & pseudo-elements           | 0           | 0         | 0        | 0    | 1    |
| classes, pseudo-classes & attributes | 0           | 0         | 0        | 1    | 0    | 
| ids                                  | 0           | 0         | 1        | 0    | 0    | 
| inline styles                        | 0           | 1         | 0        | 0    | 0    | 
| !important                           | 1           | 0         | 0        | 1    | 0    | 


#### **Beispiele**

| Selector                             | x 10.000    | x 1.000   | x 100    | x 10 | x 1  | Ttal Specificity|
| ---------                            | ------------| --------- | ---------| -----| -----| ----------------|
| h1                                   | 0           | 0         | 0        | 0    | 1    | 1
| h1 + p::first-letter                 | 0           | 0         | 0        | 0    | 3    | 3
| li > a[href*="en-US"] > .inline-warning | 0           | 0         | 0        | 2    | 2    | 22
| #identifier                          | 0           | 1         | 0        | 0    | 0    | 100
| No selector, with a rule inside an element's style attribute    | 0           | 1         | 0        | 0    | 0    | 1000
| #identifier, with !important in rule | 1           | 0         | 1        | 0    | 0    | 10100