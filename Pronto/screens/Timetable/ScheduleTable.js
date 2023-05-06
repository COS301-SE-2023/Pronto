import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

const ScheduleTable = () => {

   return (
       <View style={styles.container}>
           {/* Row 1 */}
           <View style={styles.row}>
               <View style={styles.cell}><Text style={styles.text}>Time</Text></View>
               <View style={styles.cell}><Text style={styles.text}>Mon</Text></View>
               <View style={styles.cell}><Text style={styles.text}>Tues</Text></View>
               <View style={styles.cell}><Text style={styles.text}>Wed</Text></View>
               <View style={styles.cell}><Text style={styles.text}>Thurs</Text></View>
               <View style={styles.cell}><Text style={styles.text}>Fri</Text></View>
           </View>

           {/* Row 2 */}
           <View style={styles.row}>
               <View style={styles.cell}><Text style={styles.text}>07:30 - <br/>08:20</Text></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
           </View>

           {/* Row 3 */}
           <View style={styles.row}>
               <View style={styles.cell}><Text style={styles.text}>08:30 - <br/>09:20</Text></View>
               <View style={[styles.cell, styles.lecture]}><Text style={styles.lectureText} >COS301 <br/> L1 <br/> Informatorium <br/>IT 2-26</Text></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
           </View>

           {/* Row 4 */}
           <View style={styles.row}>
               <View style={styles.cell}><Text style={styles.text}>09:30 - <br/>10:20</Text></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
           </View>

           {/* Row 5 */}
           <View style={styles.row}>
               <View style={styles.cell}><Text style={styles.text}>11:30 - <br/>12:20</Text></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
           </View>

           {/* Row 6 */}
           <View style={styles.row}>
               <View style={styles.cell}><Text style={styles.text}>12:30 - <br/>13:20</Text></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
           </View>

           {/* Row 7 */}
           <View style={styles.row}>
               <View style={styles.cell}><Text style={styles.text}>13:30 - <br/>14:20</Text></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
           </View>

           {/* Row 7 */}
           <View style={styles.row}>
               <View style={styles.cell}><Text style={styles.text}>15:30 - <br/>16:20</Text></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
           </View>

           {/* Row 8 */}
           <View style={styles.row}>
               <View style={styles.cell}><Text style={styles.text}>16:30 - <br/>17:20</Text></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
           </View>

           {/* Row 9 */}
           <View style={styles.row}>
               <View style={styles.cell}><Text style={styles.text}>17:30 - <br/>18:20</Text></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
           </View>

           {/* Row 10 */}
           <View style={styles.row}>
               <View style={styles.cell}><Text style={styles.text}>18:30 - <br/>19:20</Text></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
           </View>

           {/* Row 10 */}
           <View style={styles.row}>
               <View style={styles.cell}><Text style={styles.text}>19:30 - <br/>20:20</Text></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
               <View style={styles.cell}></View>
           </View>

       </View>
   )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        maxWidth: '83.5%',
    },
    row: {
        flexDirection: 'row',

    },
    cell: {
        width: '20%',

        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    text: {
        fontSize: '80%',
        fontWeight: 'bold',
    },
    lecture: {
        backgroundColor: '#d37b40',
        borderRadius: 5,
        maxWidth: '100%',
    },
    lectureText: {
        fontSize: '20%',
        fontWeight: 'bold',
        textAlign: 'center',

    }
});


export default ScheduleTable;
